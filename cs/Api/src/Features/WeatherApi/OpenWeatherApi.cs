using System.Net;
using System.Text.Json;
using Api.Common.ApiClient;
using Api.Common.RedisCache;
using Api.Extensions;
using Api.Features.WeatherApi.Models;
using Api.Features.WeatherApi.Views;

namespace Api.Features.WeatherApi;

public class OpenWeatherApi : BaseApiClient, IOpenWeatherApi
{
    private readonly string _apiKey;
    private readonly JsonSerializerOptions _serializerOptions;

    public OpenWeatherApi(HttpClient http, IRedisCache cache, IConfiguration config) : base(http, config, cache)
    {
        _apiKey = _config["OpenWeather:ApiKey"];
        _httpClient.BaseAddress = new Uri(_config["OpenWeather:BaseUrl"]);
        _serializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<WeatherView?> GetWeatherByCoords(double lat, double lon)
    {
        int measurementsRefreshRateInMinutes = 10;
        string date = DateTime.Now.Date.ToString("dd/MM/yyyy");
        string cacheKey = $"weather:lat:{lat}-lon:{lon}";
        WeatherView? weatherData = null;
        {
            try
            {
                weatherData = await _cache.GetAsync<WeatherView>(cacheKey);

                // diff in seconds between now and datetime of latest measurements.
                var diff = DateTime.UtcNow - weatherData?.MeasurementTime;

                if (diff > TimeSpan.FromMinutes(measurementsRefreshRateInMinutes))
                {
                    // cached measurements older than api refresh rate
                    throw new Exception("cached measurements too old");
                }
            }
            catch
            {
                {
                    // set key
                    var res = await _httpClient.GetAsync($"weather?appid={_apiKey}&units=metric&lat={lat}&lon={lon}");
                    Console.WriteLine(await res.Content.ReadAsStringAsync());
                    var raw = await res.DeserializeAsync<OpenWeatherResponse>();
                    weatherData = new(
                        Description: raw.Weather[0].Description,
                        Icon: raw.Weather[0].Icon,
                        Location: raw.Name,
                        MeasurementTime: DateTimeOffset.FromUnixTimeSeconds(raw.MeasurementTime).DateTime,
                        Temperature: raw.Main.Temp,
                        Visibility: raw.Visibility,
                        FeelsLike: raw.Main.FeelsLike,
                        TempMax: raw.Main.TempMax,
                        TempMin: raw.Main.TempMin,
                        Humidity: raw.Main.Humidity,
                        SunRise: DateTimeOffset.FromUnixTimeSeconds(raw.Sys.SunRise).DateTime,
                        SunSet: DateTimeOffset.FromUnixTimeSeconds(raw.Sys.SunSet).DateTime,
                        Latitude: raw.Coord.Lat,
                        Longitude: raw.Coord.Lon
                    );

                    if (res.StatusCode == HttpStatusCode.OK)
                    {
                        await _cache.SetAsync(cacheKey, res);
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
        return weatherData;
    }
}