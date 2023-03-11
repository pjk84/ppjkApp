
using System.Text.Json.Serialization;

public struct OpenWeatherResponse
{
    [JsonPropertyName("dt")]
    public int MeasurementTime { get; set; }
    [JsonPropertyName("visibility")]
    public int Visibility { get; set; }
    [JsonPropertyName("name")]
    public string Name { get; set; }
    [JsonPropertyName("main")]
    public WeatherMain Main { get; set; }

}


public struct WeatherMain
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


