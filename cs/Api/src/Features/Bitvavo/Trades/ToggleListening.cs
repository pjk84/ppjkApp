using System.Net.WebSockets;
using Api.Common.Result;
using Api.Database;

namespace Api.Features.Bitvavo.Trades;

public record ToggleTradingPlanListenerCommand(string PlanId, WebSocket? Ws = null) : IRequest<Result>;

public class ToggleListener(IBitvavoContext database, IConfiguration config) : IRequestHandler<ToggleTradingPlanListenerCommand, Result>
{

    public async Task<Result> Handle(ToggleTradingPlanListenerCommand request, CancellationToken cancellationToken)
    {

        var plan = await database.GetTradingPlanAsync(request.PlanId, cancellationToken);
        if (plan == null)
        {
            return Result.Failed();
        }
        var updated = plan with { Listening = request.Ws != null };
        await database.UpdateTradingPlanAsync(updated, cancellationToken);

        var ws = new WebSocketClientTrades(config, database, plan, request.Ws);

        if (request.Ws != null)
        {
            await ws.OpenConnection();
        }
        else
        {
            ws.OpenConnection();
        }

        return Result.Ok();
    }

}

