using Api.Common.Result;
using Api.Database;
using Api.Database.Models;
using Api.Features.Bitvavo.Views;

namespace Api.Features.Bitvavo;

using R = Result<tradingPlanView[]>;
public record GetTradingPlansQuery() : IRequest<R>;

public class GetTradingPlans(IBitvavoContext database) : IRequestHandler<GetTradingPlansQuery, R>
{
    public async Task<R> Handle(GetTradingPlansQuery request, CancellationToken cancellationToken)
    {
        var tradingPlans = await database.GetTradingPlansAsync(cancellationToken);
        var views = tradingPlans.Select(ToView).ToArray();
        return Result.Ok(views);
    }

    private static tradingPlanView ToView(TradingPlan plan) =>
        new tradingPlanView(Id: plan.Id, Market: plan.Market, CreatedAt: plan.CreatedAt.ToString("dd-MM-yyyy"), Amount: plan.Amount, Active: plan.active);

}

