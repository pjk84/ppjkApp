using Api.Common.Result;
using Api.Database;

namespace Api.Features.Bitvavo.Trades;


public record CreateTradingPlanCommand(string Market, int Amount) : IRequest<Result>;

public class CreateTradingPlan(IBitvavoContext database) : IRequestHandler<CreateTradingPlanCommand, Result>
{

    public async Task<Result> Handle(CreateTradingPlanCommand request, CancellationToken cancellationToken)
    {
        await database.CreateTradingPlanAsync(request.Market, request.Amount, cancellationToken);

        // tar

        return Result.Ok();
    }

}

