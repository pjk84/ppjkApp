
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Api.Application.Models;
using System.Reflection;
using Api.Common.IpApi;
using Api.Common.GeoCoding;
using Microsoft.AspNetCore.Authorization;
using Api.Features.Auth.Models;
using Api.Features.Auth.Handlers;

namespace Api.Features.WeatherApi;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator) => _mediator = mediator;

    [HttpPost]
    [Route("login-with-google")]
    public async Task<ActionResult<string>> LoginWithGoogle(LoginWithGooglePayload payload)
    {
        var query = new LoginWithGoogleQuery(payload);
        var res = await _mediator.Send(query);

        if (res.Success)
        {
            return Ok(res.Value);
        }

        return Unauthorized();

    }
}
