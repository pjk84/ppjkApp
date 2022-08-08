
namespace Api.Application.Interfaces;
public interface IBaseApiClient
{
    HttpClient _httpClient { get; }
    IConfiguration _config { get; }
}