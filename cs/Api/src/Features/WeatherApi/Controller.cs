
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Api.Application.Models;
using System.Reflection;
using Api.Common.IpApi;
using Api.Common.GeoCoding;
using Microsoft.AspNetCore.Authorization;
using Api.Features.WeatherApi.Views;

namespace Api.Features.WeatherApi;

[ApiController]
[Route("[controller]")]
public class WeatherController : ControllerBase
{

    private readonly IOpenWeatherApi _weatherApi;
    private readonly IGeoCoding _geoCoding;

    private readonly IIpApi _ipApi;

    public WeatherController(IIpApi ipService, IOpenWeatherApi weatherService, IGeoCoding geoCodingClient)
    {
        _ipApi = ipService;
        _weatherApi = weatherService;
        _geoCoding = geoCodingClient;
    }
    [HttpGet]
    [Route("~/weather/ip")]
    public async Task<ActionResult<string>> getWeatherByIp()
    {
        Console.WriteLine("!@#!@");
        var clientIp = Request.HttpContext?.Connection?.RemoteIpAddress?.ToString();
        clientIp = "86.83.105.101";
        if (clientIp == null)
        {
            return BadRequest();
        }
        var ipApiResponse = await _ipApi.GetCoordsByIp(clientIp);

        if (ipApiResponse == null)
        {
            return NotFound();
        }
        //round to 2 digits for ease of caching lalton
        var lat = Math.Round(ipApiResponse.Lat, 2);
        var lon = Math.Round(ipApiResponse.Lon, 2);
        try
        {
            var weather = await _weatherApi.GetWeatherByCoords(lat, lon);
            return Ok(new WeatherByIpView(clientIp, weather));
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

        Console.WriteLine(res);
        if (res == null)
        {
            return NotFound("address not found");
        }

        return res;
    }
}