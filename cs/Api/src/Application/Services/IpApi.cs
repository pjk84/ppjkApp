
using System.Net;
using System.Text.Json;
using Api.Application.Interfaces;

namespace Api.Application.Services;
public class IpApi : BaseApiClient, IIpApi
{

    private readonly IOpenWeatherApi _openWeatherApi;
    private readonly JsonSerializerOptions _serializerOptions;

    public IpApi(IConfiguration config, HttpClient http, IOpenWeatherApi openWeatherClient, IRedisCache cache) : base(http, config, cache)
    {
        _openWeatherApi = openWeatherClient;
        _httpClient.BaseAddress = new Uri("http://ip-api.com/json/");
        _serializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<IpApiResponse> GetCoordsByIp(string clientIp)
    {
        string cacheKey = $"coords_by_ip_{clientIp.Replace(".", "_")}";
        IPAddress ipAddress;
        string asString = String.Empty;
        if (!IPAddress.TryParse(clientIp, out ipAddress))
        {
            throw new FormatException();
        }
        // get from cache
        try
        {
            asString = await _cache.GetKey(cacheKey);
        }
        catch
        {
            // get from api
            var res = await _httpClient.GetAsync(clientIp);
            if (res.StatusCode == HttpStatusCode.OK)
            {
                asString = await res.Content.ReadAsStringAsync();
                await _cache.SetKey(cacheKey, asString);
            }
        }
        return JsonSerializer.Deserialize<IpApiResponse>(asString, _serializerOptions);
    }
}