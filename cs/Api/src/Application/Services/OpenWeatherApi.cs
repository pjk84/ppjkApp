using System.Net;
using System.Text.Json;
using Api.Application.Interfaces;
using StackExchange.Redis;

namespace Api.Application.Services;

public class OpenWeatherApi : BaseApiClient, IOpenWeatherApi
{

    private readonly string _apiKey;
    private readonly JsonSerializerOptions _serializerOptions;

    public OpenWeatherApi(HttpClient http, IRedisCache cache, IConfiguration config) : base(http, config, cache)
    {
        _apiKey = _config["OPEN_WEATHER_API_KEY"];
        _httpClient.BaseAddress = new Uri($"https://api.openweathermap.org/data/2.5/");
        _serializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<OpenWeatherResponse> GetWeatherByCoords(double lat, double lon)
    {
        int measurementsRefreshRateInSeconds = 600;
        string date = DateTime.Now.Date.ToString("dd/MM/yyyy");
        string cacheKey = $"weather_{lat}-{lon}";
        string weatherData = String.Empty;
        {
            try
            {
                weatherData = await _cache.GetKey(cacheKey);
                int measurementTime = JsonSerializer.Deserialize<OpenWeatherResponse>(weatherData).MeasurementTime;

                // diff in seconds between now and datetime of latest measurements.
                var diff = new DateTimeOffset(DateTime.UtcNow).ToUnixTimeSeconds() - measurementTime;

                if (diff > measurementsRefreshRateInSeconds)
                {
                    // cached measurements older than api refresh rate
                    throw new Exception("cached measurements outdated");
                }
            }
            catch
            {
                {
                    // set key
                    var res = await _httpClient.GetAsync($"weather?appid={_apiKey}&units=metric&lat={lat}&lon={lon}");

                    if (res.StatusCode == HttpStatusCode.OK)
                    {
                        weatherData = await res.Content.ReadAsStringAsync();
                        await _cache.SetKey(cacheKey, weatherData);
                    }
                    else
                    {
                        if (res.StatusCode == HttpStatusCode.Unauthorized)
                        {
                            throw new UnauthorizedAccessException();
                        }
                        throw new Exception();
                    }

                }
            }
        }
        return JsonSerializer.Deserialize<OpenWeatherResponse>(weatherData);
    }
}