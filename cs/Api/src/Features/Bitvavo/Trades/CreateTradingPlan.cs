using Api.Common.Result;
using Api.Database;
using Api.Database.Models;
using Api.Features.Bitvavo.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Api.Features.Bitvavo.Trades;


public record CreateTradingPlanCommand(CreateTradingPlanPayload plan) : IRequest<Result>;

public class CreateTradingPlan(IBitvavoContext database, IConfiguration config) : IRequestHandler<CreateTradingPlanCommand, Result>
{

    public async Task<Result> Handle(CreateTradingPlanCommand request, CancellationToken cancellationToken)
    {
        var (market, amount, buyAt, sellAt) = request.plan;
        var plan = await database.CreateTradingPlanAsync(market, amount, buyAt, sellAt, cancellationToken);

        var ws = new WebSocketClientTrades(config, database, plan);

        // synchronously start websocket
        ws.OpenConnection();

        return Result.Ok();
    }

}

