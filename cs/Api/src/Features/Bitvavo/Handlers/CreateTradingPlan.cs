using Api.Common.Result;
using Api.Database;
using Api.Features.Bitvavo.Models;
using Api.Features.Bitvavo.Views;

namespace Api.Features.Bitvavo;


public record CreateTradingPlanCommand(string Market, int Amount) : IRequest<Result>;

public class CreateTradingPlan(IBitvavoContext database) : IRequestHandler<CreateTradingPlanCommand, Result>
{

    public async Task<Result> Handle(CreateTradingPlanCommand request, CancellationToken cancellationToken)
    {
        await database.CreateTradingPlanAsync(request.Market, request.Amount, cancellationToken);

        return Result.Ok();
    }

}

