using System.Globalization;
using Api.Common.Result;
using Api.Database;
using Api.Database.Models;

namespace Api.Features.Bitvavo;

using R = Result<List<BitvavoPortfolioSnapshotView>>;

public record BitvavoPortfolioSnapshotQuery() : IRequest<R>;

public class BitvavoPortfolioSnapshotHandler(IBitvavoContext database) : IRequestHandler<BitvavoPortfolioSnapshotQuery, R>
{

    public async Task<R> Handle(BitvavoPortfolioSnapshotQuery request, CancellationToken cancellationToken)
    {
        var snapshots = await database.GetSnapshotsAsync();

        var years = snapshots.OrderBy(s => s.Date).GroupBy(s => s.Date.Year);

        List<BitvavoPortfolioSnapshotView> res = [];

        foreach (var year in years)
        {
            var months = year.OrderBy(y => y.Date).GroupBy(s => s.Date.Month);
            foreach (var month in months)
            {
                var monthName = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(month.Key);
                var days = month.Select(day => new BitvavoPortfolioSnapshotDayView(
                    Day: day.Date.Day,
                    total: day.total,
                    assets: day.Assets.Select(a => new BitvavoAssetSnapshotView(a.Market, a.Value)).ToArray()
                )).ToArray();
                var monthView = new BitvavoPortfolioSnapshotView(year.Key, month.Key, monthName, days);
                res.Add(monthView);
            };

        }
        return Result.Ok(res);
    }

}

