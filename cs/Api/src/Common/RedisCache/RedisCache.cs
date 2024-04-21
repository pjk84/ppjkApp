using System.Text;
using Microsoft.Extensions.Caching.Distributed;

namespace Api.Common.RedisCache
{
    public class RedisCache(IDistributedCache cache) : IRedisCache
    {
        public async Task<T?> GetAsync<T>(string key)
        {

            var cachedAsBytesArray = await cache.GetAsync(key);

            if ((cachedAsBytesArray?.Count() ?? 0) > 0)
            {
                Console.WriteLine($"found data in cache for key: {key}");
                var serialized = Encoding.UTF8.GetString(cachedAsBytesArray!);
                return JsonSerializer.Deserialize<T>(serialized);
            }
            return default;
        }

        public async Task SetAsync<T>(string key, T value)
        {
            var serialized = JsonSerializer.Serialize(value);
            Console.WriteLine($"setting cache key {key}");
            var asBytesArray = Encoding.UTF8.GetBytes(serialized);
            await cache.SetAsync(key, asBytesArray);
        }
    }
}
