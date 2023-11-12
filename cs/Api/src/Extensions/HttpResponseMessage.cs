namespace Api.Extensions;

public static class HttpResponseMessageExtensions
{
    public static async Task<T> DeserializeAsync<T>(this HttpResponseMessage message, JsonSerializerOptions? serializerOptions = null)
        => JsonSerializer.Deserialize<T>(await message.Content.ReadAsStringAsync(), serializerOptions ?? new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        })!;
}