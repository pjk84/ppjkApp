
using Api.Features.Bitvavo.Models;
using Api.Features.Bitvavo.Views;
using Microsoft.AspNetCore.Mvc;
using Api.Features.Bitvavo.Balance;
using Api.Features.Bitvavo.Trades;


namespace Api.Features.Bitvavo;

[ApiController]
// [Authorize]
[Route("[controller]")]
public class BitvavoController(IMediator mediator, IConfiguration config) : ControllerBase
{
    [HttpGet("portfolio")]
    public async Task<ActionResult<BitvavoPortfolioView>> GetPortfolio()
    {
        var query = new GetBitvavoBalanceQuery();
        var res = await mediator.Send(query);
        if (!res.Success)
        {
            return BadRequest();
        }
        return Ok(res.Value);
    }

    [HttpGet("/ws/bitvavo/portfolio")]
    public async Task Websocket()
    {

        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            var client = new WebSocketClientBalance(webSocket, config);
            await client.OpenConnection();
        }
        else
        {
            // HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }

    [HttpGet("snapshots")]
    public async Task<ActionResult<BitvavoPortfolioSnapshotView[]>> GetPortfolioSnapshots()
    {
        var query = new BitvavoPortfolioSnapshotQuery();
        var res = await mediator.Send(query);
        if (!res.Success)
        {
            return BadRequest();
        }
        return Ok(res.Value);
    }

    [HttpGet("orders")]
    public async Task<ActionResult<Order[]>> GetOrders()
    {
        var query = new GetOrdersQuery();
        var res = await mediator.Send(query);
        if (!res.Success)
        {
            return BadRequest();
        }
        return Ok(res.Value);
    }

    [HttpPost("trading-plan")]
    public async Task<ActionResult<Order[]>> CreateTradingPlan(CreateTradingPlanPayload payload)
    {
        var query = new CreateTradingPlanCommand(payload.Market, payload.Amount);
        var res = await mediator.Send(query);
        if (!res.Success)
        {
            return BadRequest();
        }
        return Ok();
    }
    [HttpGet("trading-plans")]
    public async Task<ActionResult<tradingPlanView[]>> GetTradingPlans()
    {
        var query = new GetTradingPlansQuery();
        var res = await mediator.Send(query);
        if (!res.Success)
        {
            return BadRequest();
        }
        return Ok(res.Value);
    }
    [HttpDelete("trading-plan/{planId}")]
    public async Task<ActionResult<tradingPlanView[]>> GetTradingPlans(string planId)
    {
        var query = new DeleteTradinPlanCommand(planId);
        var res = await mediator.Send(query);
        if (!res.Success)
        {
            return BadRequest();
        }
        return Ok();
    }
}

