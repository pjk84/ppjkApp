using System.Net;
using System.Text;
using Microsoft.Extensions.Caching.Distributed;
using Api.Application.Interfaces;

namespace Api.Application.Services
{
    public class RedisCache : IRedisCache
    {

        private readonly IDistributedCache _cache;
        public RedisCache(IDistributedCache cache)
        {
            _cache = cache;
        }

        public async Task<string> GetKey(string key)
        {
            var cachedAsBytesArray = await _cache.GetAsync(key);
            if ((cachedAsBytesArray?.Count() ?? 0) > 0)
            {
                Console.WriteLine($"found data in cache for key: {key}");
                var cachedSerialized = Encoding.UTF8.GetString(cachedAsBytesArray);
                return cachedSerialized;
            }
            throw new KeyNotFoundException();
        }

        public async Task SetKey(string key, string value)
        {
            Console.WriteLine($"setting cache key {key}");
            var asBytesArray = Encoding.UTF8.GetBytes(value);
            await _cache.SetAsync(key, asBytesArray);
        }
    }
}
