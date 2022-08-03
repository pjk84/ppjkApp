
using Microsoft.AspNetCore.Mvc;
using Api.Application.Interfaces;

namespace Api.Controllers;

[ApiController]
[Route("[controller")]
public class TestController : ControllerBase
{
    private readonly IConfiguration _config;

    private readonly IOpenWeatherApi _openWeatherApi;

    private readonly IIpApi _ipApi;

    public TestController(IConfiguration config)
    {
    }

    [HttpGet]
    [Route("~/test")]
    public int? test()
    {

        int? y = 1;
        y ??= 2;
        return y;
    }
}