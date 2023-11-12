using Api.Features.WeatherApi.Views;
namespace Api.Features.WeatherApi;
public interface IOpenWeatherApi
{

    Task<WeatherView> GetWeatherByCoords(double lat, double lon);
}


