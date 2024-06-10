using Api.Common.Result;
using Api.Database;

namespace Api.Features.Bitvavo.Trades;


public record CreateTradingPlanCommand(string Market, int Amount) : IRequest<Result>;

public class CreateTradingPlan(IBitvavoContext database, IConfiguration config) : IRequestHandler<CreateTradingPlanCommand, Result>
{

    public async Task<Result> Handle(CreateTradingPlanCommand request, CancellationToken cancellationToken)
    {
        var plan = await database.CreateTradingPlanAsync(request.Market, request.Amount, cancellationToken);

        var ws = new WebSocketClientTrades(config, database, plan);

        // synchronously start websocket
        ws.OpenConnection();

        return Result.Ok();
    }

}

