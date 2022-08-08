using System.Net;
using System.Text.Json;
using Api.Application.Interfaces;

namespace Api.Application.Services;

public class OpenWeatherApi : BaseApiClient, IOpenWeatherApi
{

    private readonly string _apiKey;


    public OpenWeatherApi(HttpClient http, IRedisCache cache, IConfiguration config) : base(http, config, cache)
    {
        _apiKey = _config["OPEN_WEATHER_API_KEY"];
        _httpClient.BaseAddress = new Uri($"https://api.openweathermap.org/data/2.5/");
    }

    public async Task<OpenWeatherResponse> GetWeatherByCoords(double lat, double lon)
    {
        string date = DateTime.Now.Date.ToString("dd/MM/yyyy");
        string cacheKey = $"{lat}-{lon}-{date}";
        string weatherData;
        try
        {
            weatherData = await _cache.GetKey(cacheKey);

        }
        catch (KeyNotFoundException)
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
        return JsonSerializer.Deserialize<OpenWeatherResponse>(weatherData);
    }
}