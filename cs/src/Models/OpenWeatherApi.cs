using Microsoft.AspNetCore.Mvc;
using System.Net;


public class OpenWeatherApi
{
    private readonly IConfiguration _config;
    private readonly IpApi _ipApi;
    private readonly HttpClient _httpClient;

    private readonly string _apiKey;

    public OpenWeatherApi(IConfiguration config, HttpClient http, IpApi ipApi)
    {
        _apiKey = config["OPEN_WEATHER_API_KEY"];
        _httpClient = http;
        _httpClient.BaseAddress = new Uri("https://api.openweathermap.org/data/3.0/onecall");
    }


    public async Task<string> getWeather(float lat, float lon)
    {
        var res = await _httpClient.GetAsync($"?lat={lat}&lon={lon}&appid={_apiKey}");
        if (res.StatusCode == HttpStatusCode.OK)
        {
            string responseBody = await res.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
            return "a";
        }
        return "b";
    }
}