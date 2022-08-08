
namespace Api.Application.Interfaces;
public interface IOpenWeatherApi
{

    Task<OpenWeatherResponse> GetWeatherByCoords(double lat, double lon);
}


