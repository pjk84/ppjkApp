
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


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
            var client = new WebsocketClient(webSocket, config);
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
}
