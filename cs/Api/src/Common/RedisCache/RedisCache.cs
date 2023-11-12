using System.Text;
using Microsoft.Extensions.Caching.Distributed;

namespace Api.Common.RedisCache
{
    public class RedisCache : IRedisCache
    {
        private readonly IDistributedCache _cache;
        public RedisCache(IDistributedCache cache)
        {
            _cache = cache;
        }

        public async Task<T?> GetAsync<T>(string key)
        {
            var cachedAsBytesArray = await _cache.GetAsync(key);

            if ((cachedAsBytesArray?.Count() ?? 0) > 0)
            {
                Console.WriteLine($"found data in cache for key: {key}");
                var serialized = Encoding.UTF8.GetString(cachedAsBytesArray!);
                return JsonSerializer.Deserialize<T>(serialized);
            }
            throw new KeyNotFoundException();
        }

        public async Task SetAsync<T>(string key, T value)
        {
            var serialized = JsonSerializer.Serialize(value);
            Console.WriteLine($"setting cache key {key}");
            var asBytesArray = Encoding.UTF8.GetBytes(serialized);
            await _cache.SetAsync(key, asBytesArray);
        }
    }
}
