
using System.Net;
using Api.Application.Interfaces;

namespace Api.Application.Services;
public class GeoCoding : BaseApiClient, IGeoCoding
{
    private readonly string _apiKey;
    public GeoCoding(HttpClient http, IConfiguration config, IRedisCache cache) : base(http, config, cache)
    {
        _httpClient.BaseAddress = new Uri("https://api.geocod.io/v1.7/");
        _apiKey = config["GEOCODING_API_KEY"];
    }

    public async Task<string> GetCoordsByAddress(string address)
    {
        var res = await _httpClient.GetAsync($"geocode?q={address}&api_key={_apiKey}");
        Console.WriteLine(res);
        if (res.StatusCode == HttpStatusCode.OK)
        {
            return await res.Content.ReadAsStringAsync();
        }
        if (res.StatusCode == HttpStatusCode.NotFound)
        {
            return null;
        }
        throw new Exception();
    }
}

//  curl "http://localhost:5002/api/dotnet/weather/address?city=eindhoven&postcode=5652xg&country=netherlands&street=scheltemaweg"


