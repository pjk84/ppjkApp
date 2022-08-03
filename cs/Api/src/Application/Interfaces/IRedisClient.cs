namespace Api.Application.Interfaces;

public interface IRedisCache
{
    Task<string> GetKey(string key);
    Task SetKey(string key, string value);
}
