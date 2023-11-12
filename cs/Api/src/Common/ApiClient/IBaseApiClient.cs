
namespace Api.Common.ApiClient;
public interface IBaseApiClient
{
    HttpClient _httpClient { get; }
    IConfiguration _config { get; }
}