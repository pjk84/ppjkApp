
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Api.Application.Interfaces;

namespace Api.Controllers;

[ApiController]
[Route("[controller")]
public class WeatherController : ControllerBase
{
    private readonly IConfiguration _config;

    private readonly IOpenWeatherApi _openWeatherApi;

    private readonly IIpApi _ipApi;

    public WeatherController(IConfiguration config, IIpApi ipApiClient, IOpenWeatherApi openWeatherClient)
    {
        _ipApi = ipApiClient;
        _openWeatherApi = openWeatherClient;
    }
    [HttpGet]
    [Route("~/weather/ip")]
    public async Task<ActionResult<string>> getWeatherByIp()
    {
        // var clientIp = Request.HttpContext.Connection.RemoteIpAddress.ToString();
        var clientIp = "86.83.105.101";
        var ipApiResponse = await _ipApi.getLocation(clientIp);

        //round to 2 digits for ease of caching lalton
        var lat = Math.Round(ipApiResponse.Lat, 2);
        var lon = Math.Round(ipApiResponse.Lon, 2);
        try
        {
            var weather = await _openWeatherApi.getWeather(lat, lon);
            return JsonSerializer.Serialize<OpenWeatherResponse>(weather);
        }
        catch (UnauthorizedAccessException)
        {
            return Unauthorized();
        }
    }
}