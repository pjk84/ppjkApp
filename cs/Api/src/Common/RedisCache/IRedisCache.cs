namespace Api.Common.RedisCache;

public interface IRedisCache
{
    Task<T?> GetAsync<T>(string key);
    Task SetAsync<T>(string key, T value);
}
