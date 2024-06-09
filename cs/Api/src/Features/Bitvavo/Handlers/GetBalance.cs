using System.Globalization;
using Api.Features.Bitvavo.Models;
using Api.Common.Result;
using Api.Database;
using Api.Database.Models;

namespace Api.Features.Bitvavo;

using R = Result<BitvavoPortfolioView>;

public record GetBitvavoBalanceQuery() : IRequest<R>;

public class BitvavoBalanceHandler(IBitvavoClient client, IBitvavoContext database) : IRequestHandler<GetBitvavoBalanceQuery, R>
{

    public async Task<R> Handle(GetBitvavoBalanceQuery request, CancellationToken cancellationToken)
    {
        var balance = await client.GetBalanceAsync(cancellationToken);
        if (balance == null)
        {
            return Result.Failed<BitvavoPortfolioView>();
        }
        var history = await client.GetTransactionHistoryAsync(cancellationToken);
        if (history == null)
        {
            return Result.Failed<BitvavoPortfolioView>();
        }
        var view = await ToView(balance, history, cancellationToken);
        if (!view.hasMissingValues)
        {
            await CreateSnapshot(view);
        }
        return Result.Ok(view);

    }

    private async Task<BitvavoPortfolioView> ToView(BitvavoBalance[] balance, BitvavoTransactionHistory transactionHistory, CancellationToken ct)
    {
        var hasMissingValues = false;
        List<BitvavoAssetView> assets = [];
        foreach (var market in balance)
        {
            if (market.Symbol == "EUR")
            {
                // skip euro
                continue;
            }
            var m = $"{market.Symbol}-EUR";
            var p = await client.GetMarketPriceAsync(m, ct);
            var p24h = await client.Get24hPriceAsync(m, ct);
            if (p == null || p24h == null)
            {
                hasMissingValues = true;
                continue;
            }
            var assetView = GetAssetView(market, p, p24h, transactionHistory);
            assets.Add(assetView);
        }
        var totalValue = assets.Sum(a => a.Value);
        var TotalResult = assets.Sum(a => a.Result);
        var totalSpent = assets.Sum(a => a.AmountSpent);
        return new(
            assets,
            TotalValue: RoundDouble(totalValue),
            TotalResult: RoundDouble(TotalResult),
            TotalSpent: RoundDouble(totalSpent),
            FetchedAt: DateTime.Now.ToString("hh:mm:ss"),
            TotalReturnOnInvestment: GetRoi(totalValue, totalSpent),
            hasMissingValues: hasMissingValues
        );
    }

    private BitvavoAssetView GetAssetView(BitvavoBalance market, BitVavoMarketPrice p, BitVavo24hPrice p24h, BitvavoTransactionHistory transactionHistory)
    {
        var price = ParseDouble(p.Price);
        var price24h = ParseDouble(p24h.Open);
        var priceAction24h = GetRoi(price, price24h);
        var spent = transactionHistory.Items.Where(i => i.ReceivedCurrency == market.Symbol).Sum(i => ParseDouble(i.SentAmount) + ParseDouble(i.FeesAmount));
        var transactionHistoryView = GetTransactionHistory(market.Symbol, transactionHistory);
        var availability = ParseDouble(market.Available);
        var value = RoundDouble(price * availability);
        return new(
            market.Symbol,
            Available: availability,
            Price: price,
            Price24h: price24h,
            priceAction24h: GetRoi(price, price24h),
            Value: value,
            TransactionHistory: transactionHistoryView,
            AmountSpent: RoundDouble(spent),
            Result: RoundDouble(value - spent, false),
            ReturnOnInvestment: spent == 0 ? 100 : GetRoi(value, spent)
        );
    }

    private async Task CreateSnapshot(BitvavoPortfolioView view)
    {
        var now = DateTime.UtcNow;
        var hasSnapshot = await database.HasSnapshotForTodayAsync(now);

        if (hasSnapshot)
        {
            // already exists. do nothing
            return;
        }

        var snapshot = new BitvavoPortfolioSnapshot(
            now,
            view.TotalValue,
            view.Assets.Select(a => new BitvavoAssetSnapshot(a.Market, a.Value)).ToArray()
        );

        if (snapshot.total > 0)
        {
            await database.CreateSnapshotAsync(snapshot);
        }

    }

    private BitvavoTransactionHistoryView[] GetTransactionHistory(string market, BitvavoTransactionHistory transactionHistory) =>
        transactionHistory.Items
            .Where(i => i.ReceivedCurrency == market)
            .OrderBy(i => i.ExecutedAt)
            .Select(i => new BitvavoTransactionHistoryView(i.ExecutedAt.ToString("dd-MM-yyyy"), ParseDouble(i.SentAmount), RoundDouble(ParseDouble(i.FeesAmount), false)))
            .ToArray();

    private static double GetRoi(double value, double spent) => RoundDouble((value - spent) / spent * 100, false);

    private static double RoundDouble(double value, bool withPrecision = true)
    {
        var rounded = double.Round(value, 2);
        if (withPrecision && value < 1)
        {
            // return value without rounding if a very small decimal number
            return value;
        }
        return rounded;
    }

    private static double ParseDouble(string value)
    {
        var parsed = double.Parse(value, CultureInfo.InvariantCulture);
        return RoundDouble(parsed);
    }

}

