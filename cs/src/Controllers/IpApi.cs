
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;


[ApiController]
[Route("[controller")]
public class IpApi : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly HttpClient _httpClient;

    private readonly JsonSerializerOptions _serializerOptions;
    private readonly string _apiKey;

    public IpApi(IConfiguration config, HttpClient http)
    {
        _httpClient = http;
        _httpClient.BaseAddress = new Uri("http://ip-api.com/json/");
        _serializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            WriteIndented = true
        };
    }

    [HttpGet]
    [Route("~/weather")]
    public async Task<string> getLocation()
    {
        // var clientIp = Request.HttpContext.Connection.RemoteIpAddress.ToString();
        var clientIp = "86.83.105.101";
        var res = await _httpClient.GetAsync(clientIp);
        if (res.StatusCode == HttpStatusCode.OK)
        {
            string responseBody = await res.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
            IpApiResponse ipApiResponse = JsonSerializer.Deserialize<IpApiResponse>(responseBody, _serializerOptions);
            Console.WriteLine(ipApiResponse.Region);
            return "a"
;
        }
        return "b";
    }
}