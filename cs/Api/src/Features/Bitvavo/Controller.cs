
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Api.Features.Bitvavo;

[ApiController]
// [Authorize]
[Route("[controller]")]
public class BitvavoController(IMediator mediator) : ControllerBase
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
}
