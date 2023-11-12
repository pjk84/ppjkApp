
using System.Net;
using System.Text.Json;
using Api.Features.WeatherApi;
using Api.Common.RedisCache;
using Api.Common.ApiClient;
using Api.Extensions;

namespace Api.Common.IpApi;
public class IpApi : BaseApiClient, IIpApi
{
    private readonly JsonSerializerOptions _serializerOptions;

    public IpApi(IConfiguration config, HttpClient http, IOpenWeatherApi openWeatherClient, IRedisCache cache) : base(http, config, cache)
    {
        _httpClient.BaseAddress = new Uri(config["IpApi:BaseUrl"]);
        _serializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<IpApiResponse?> GetCoordsByIp(string clientIp)
    {
        string cacheKey = $"coords_by_ip:{clientIp.Replace(".", "_")}";
        IpApiResponse? ipAddress = null;;
        if (!IPAddress.TryParse(clientIp, out _))
        {
            throw new FormatException();
        }
        try
        {
            // get from cache
            ipAddress = await _cache.GetAsync<IpApiResponse>(cacheKey);
        }
        catch
        {
            // get from api
            var res = await _httpClient.GetAsync(clientIp);
            ipAddress = await res.DeserializeAsync<IpApiResponse>();
            if (res.StatusCode == HttpStatusCode.OK)
            {
                await _cache.SetAsync(cacheKey, ipAddress);
            }
        }
        return ipAddress;
    }
}