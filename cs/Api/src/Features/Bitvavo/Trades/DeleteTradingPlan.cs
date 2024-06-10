using Api.Common.Result;
using Api.Database;
using Api.Database.Models;
using Api.Features.Bitvavo.Views;

namespace Api.Features.Bitvavo;

public record DeleteTradinPlanCommand(string PlanId) : IRequest<Result>;

public class DeleteTradingPlan(IBitvavoContext database) : IRequestHandler<DeleteTradinPlanCommand, Result>
{
    public async Task<Result> Handle(DeleteTradinPlanCommand request, CancellationToken cancellationToken)
    {
        try
        {
            await database.DeleteTradingPlanAsync(request.PlanId, cancellationToken);
        }
        catch
        {
            return Result.Failed();
        }
        return Result.Ok();
    }
}

