import React, { useEffect, useState } from "react";
import { FlexBox } from "../styles/containers";
import apiClient from "../api/client";
import { TableCell } from "../styles/table";
import Loader from "../components/Loaders";

type WeahterData = {
  MeasurementTime: Date;
  location: string;
  longitude: number;
  latitude: number;
  temp: number;
  visibility: number;
  feelsLike: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  sunset: Date;
  sunrise: Date;
  icon: string;
  description: string;
};

type WeatherResponse = {
  ipAddress: string;
  weatherData: WeahterData;
};

const WeatherDetails = (data: any) => (
  <table>
    <tbody>
      {Object.keys(data).map((d, i) => (
        <tr key={`weather_row_${i}`}>
          <TableCell index={i}>{d}</TableCell>
          <TableCell index={i}>
            {d === "icon" ? (
              <img
                style={{ height: 50, width: 50 }}
                alt={"weahter_icon"}
                src={`https://openweathermap.org/img/wn/${data[d]}@2x.png`}
              />
            ) : (
              data[d]
            )}
          </TableCell>
        </tr>
      ))}
    </tbody>
  </table>
);

const WeatherApi = () => {
  const [fetched, setFetched] = useState(false);
  const [weatherResponse, setWeatherResponse] =
    useState<WeatherResponse | null>(null);

  useEffect(() => {
    if (!fetched) {
      // get weather data
      const getWeather = async () => {
        var data = await apiClient().get<WeatherResponse>("/weather/ip");
        if (data) {
          setWeatherResponse(data);
          setFetched(true);
        }
      };

      getWeather();
    }
  });

  return (
    <FlexBox
      justify="center"
      id="weather_api_main"
      style={{
        overflow: "hidden",
        transition: "all 0.1s",
      }}
    >
      <FlexBox column gapSize={"large"}>
        {weatherResponse ? (
          <div>{`weather data for ip address: ${weatherResponse?.ipAddress}`}</div>
        ) : fetched ? (
          "could not get weather data"
        ) : (
          <Loader type="round" text="loading weather data.." />
        )}
        {weatherResponse && WeatherDetails(weatherResponse.weatherData)}
      </FlexBox>
    </FlexBox>
  );
};
export default WeatherApi;
