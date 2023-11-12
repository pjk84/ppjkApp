namespace Api.Features.WeatherApi.Views;

public record WeatherView(
    DateTime MeasurementTime,
    string Location,
    float Latitude,
    float Longitude,
    int Visibility,
    float Temperature,
    float FeelsLike,
    float TempMax,
    float TempMin,
    float Humidity,
    DateTime Sunrise,
    DateTime Sunset,
    string Icon,
    string Description
);

public record WeatherByIpView
(
    string IpAddress,
    WeatherView WeatherData
);