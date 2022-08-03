
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using Api.Application.Interfaces;

namespace Api.Application.Services;
public class IpApi : IIpApi
{
    private readonly IConfiguration _config;
    private readonly HttpClient _httpClient;

    private readonly OpenWeatherApi _openWeatherApi;
    private readonly JsonSerializerOptions _serializerOptions;
    private readonly string _apiKey;

    public IpApi(IConfiguration config, HttpClient http, OpenWeatherApi openWeatherClient)
    {
        _httpClient = http;
        _openWeatherApi = openWeatherClient;
        _httpClient.BaseAddress = new Uri("http://ip-api.com/json/");
        _serializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    public async Task<IpApiResponse> getLocation(string clientIp)
    {
        var res = await _httpClient.GetAsync(clientIp);
        if (res.StatusCode == HttpStatusCode.OK)
        {
            var responseBody = await res.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<IpApiResponse>(responseBody, _serializerOptions);
        }
        throw new Exception("could not get weather data");
    }
}