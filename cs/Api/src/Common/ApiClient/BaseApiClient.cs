
using Api.Common.RedisCache;

namespace Api.Common.ApiClient;

public class BaseApiClient : IBaseApiClient
{
    public HttpClient _httpClient { get; }
    public IConfiguration _config { get; }
    public IRedisCache _cache { get; set; }
    public BaseApiClient(HttpClient httpClient, IConfiguration config, IRedisCache cache)
    {
        _config = config;
        _httpClient = httpClient;
        _cache = cache;
    }

}