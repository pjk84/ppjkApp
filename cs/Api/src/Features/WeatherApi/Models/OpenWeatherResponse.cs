
using System.Text.Json.Serialization;

namespace Api.Features.WeatherApi.Models;

public record OpenWeatherResponse
{
    [JsonPropertyName("dt")]
    public int MeasurementTime { get; set; }
    [JsonPropertyName("visibility")]
    public int Visibility { get; set; }
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("main")]
    public WeatherMain Main { get; set; }

    public SunData Sys { get; set; }

    public Coords Coord { get; set; }

    public Weather[] Weather { get; set; }
}


public record WeatherMain
{
    [JsonPropertyName("temp")]
    public float Temp { get; set; }
    [JsonPropertyName("feels_like")]
    public float FeelsLike { get; set; }
    [JsonPropertyName("temp_min")]
    public float TempMin { get; set; }
    [JsonPropertyName("temp_max")]
    public float TempMax { get; set; }
    [JsonPropertyName("humidity")]
    public int Humidity { get; set; }
    [JsonPropertyName("pressure")]
    public int Pressure { get; set; }

}

public record Weather
{
    [JsonPropertyName("icon")]
    public string Icon { get; set; }
    [JsonPropertyName("description")]
    public string Description { get; set; }
}

public record Coords
{
    [JsonPropertyName("lat")]
    public float Lat { get; set; }
    [JsonPropertyName("lon")]
    public float Lon { get; set; }
}


public record SunData
{
    [JsonPropertyName("sunrise")]
    public int SunRise { get; set; }
    [JsonPropertyName("sunset")]
    public int SunSet { get; set; }
}
