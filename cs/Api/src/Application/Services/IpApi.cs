
using System.Net;
using System.Text.Json;
using Api.Application.Interfaces;

namespace Api.Application.Services;
public class IpApi : BaseApiClient, IIpApi
{

    private readonly IOpenWeatherApi _openWeatherApi;
    private readonly JsonSerializerOptions _serializerOptions;
    private readonly string _apiKey;

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
        IPAddress ipAddress;
        if (!IPAddress.TryParse(clientIp, out ipAddress))
        {
            throw new FormatException();
        }
        var res = await _httpClient.GetAsync(clientIp);
        if (res.StatusCode == HttpStatusCode.OK)
        {
            var responseBody = await res.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<IpApiResponse>(responseBody, _serializerOptions);
        }
        throw new Exception();
    }
}