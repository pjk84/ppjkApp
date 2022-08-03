
namespace Api.Application.Interfaces;
public interface IOpenWeatherApi
{

    Task<OpenWeatherResponse> getWeather(double lat, double lon);
}


