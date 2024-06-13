using Api.Common.Result;
using Api.Features.Bitvavo.Views;

namespace Api.Features.Bitvavo.Markets;

using R = Result<MarketPriceView>;
public record GetMarketPriceQuery(string Market) : IRequest<R>;

public class GetMarketPrice(IBitvavoClient client) : IRequestHandler<GetMarketPriceQuery, R>
{
    public async Task<R> Handle(GetMarketPriceQuery request, CancellationToken cancellationToken)
    {
        var market = $"{request.Market}-EUR";
        var res = await client.GetMarketPriceAsync(market, cancellationToken);
        if (res == null)
        {
            return Result.Failed<MarketPriceView>();
        }
        return Result.Ok(new MarketPriceView(request.Market, res.Price));
    }

}