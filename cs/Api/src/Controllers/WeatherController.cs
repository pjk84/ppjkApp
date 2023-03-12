
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Api.Application.Interfaces;
using Api.Application.Models;
using System.Reflection;

namespace Api.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherController : ControllerBase
{

    private readonly IOpenWeatherApi _openWeatherApi;
    private readonly IGeoCoding _geoCoding;

    private readonly IIpApi _ipApi;

    public WeatherController(IIpApi ipApiClient, IOpenWeatherApi openWeatherClient, IGeoCoding geoCodingClient)
    {
        _ipApi = ipApiClient;
        _openWeatherApi = openWeatherClient;
        _geoCoding = geoCodingClient;
    }
    [HttpGet]
    [Route("~/weather/ip")]
    public async Task<ActionResult<string>> getWeatherByIp()
    {
        var clientIp = Request.HttpContext.Connection.RemoteIpAddress.ToString();
        // var clientIp = "86.83.105.101";
        var ipApiResponse = await _ipApi.GetCoordsByIp(clientIp);
        Console.WriteLine(ipApiResponse);
        //round to 2 digits for ease of caching lalton
        var lat = Math.Round(ipApiResponse.Lat, 2);
        var lon = Math.Round(ipApiResponse.Lon, 2);
        try
        {
            var weather = await _openWeatherApi.GetWeatherByCoords(lat, lon);
            return JsonSerializer.Serialize<OpenWeatherResponse>(weather);
        }
        catch (UnauthorizedAccessException)
        {
            return Unauthorized();
        }
    }
    [HttpGet]
    [Route("~/weather/address")]
    public async Task<ActionResult<string>> getWeatherByAddress([FromQuery] AddressQuery address)
    {
        var city = address.city;
        var country = address.country;
        var street = address.street;
        var postCode = address.postal_code;
        string q = String.Empty;

        string fullAddress = "";
        foreach (PropertyInfo prop in address.GetType().GetProperties())
        {
            var value = prop.GetValue(address);
            if (value == null)
            {
                continue;
            }
            q = $"{prop.Name.ToString()}={value.ToString().Replace(" ", "+")}";
            if (fullAddress.Length != 0)
            {
                q = $"&{q}";
            }
            fullAddress += q;
        }
        var res = await _geoCoding.GetCoordsByAddress(fullAddress);
        if (res == null)
        {
            return NotFound("address not found");
        }

        return res;
    }
}
