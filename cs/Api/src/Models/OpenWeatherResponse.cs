

public class OpenWeatherResponse
{
    public int visibility { get; set; }
    public WeatherMain main { get; set; }

}


public class WeatherMain
{
    public float temp { get; set; }
    public float feels_like { get; set; }
    public float temp_min { get; set; }
    public float temp_max { get; set; }
    public int humidity { get; set; }
    public int pressure { get; set; }
}


