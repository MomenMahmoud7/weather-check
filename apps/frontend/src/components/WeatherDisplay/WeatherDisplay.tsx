import { FC } from "react";
import { WeatherDisplayProps } from "./WeatherDisplay.types";
import Loading from "../ui/Loading";

const WeatherDisplay: FC<WeatherDisplayProps> = ({
  weatherData,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loading />
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  return (
    <div
      data-testid="weather-display"
      className="flex flex-col gap-4 p-4 bg-white rounded-3xl shadow-zinc-100 shadow-2xl w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col p-4 justify-center">
          <h2
            data-testid="location-name"
            className="text-4xl sm:text-5xl text-center sm:text-left"
          >
            {weatherData.location.name}
          </h2>
          <p
            data-testid="location-details"
            className="text-zinc-400 text-center sm:text-left"
          >
            {weatherData.location.region}, {weatherData.location.country}
          </p>
        </div>
        <div className="flex flex-col p-4 justify-center items-center sm:items-end">
          <div data-testid="temperature" className="text-4xl sm:text-5xl">
            {weatherData.current.temp_c}°c
          </div>
          <div data-testid="condition" className="text-zinc-400">
            {weatherData.current.condition.text}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 flex flex-col p-4 justify-center bg-zinc-50 rounded-2xl">
          <p className="text-center text-zinc-400">Humidity</p>
          <div
            data-testid="humidity"
            className="text-center text-2xl sm:text-3xl"
          >
            {weatherData.current.humidity}%
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4 justify-center bg-zinc-50 rounded-2xl">
          <p className="text-center text-zinc-400">Wind Speed</p>
          <div
            data-testid="wind-speed"
            className="text-center text-2xl sm:text-3xl"
          >
            {weatherData.current.wind_kph} km/h
          </div>
        </div>
        <div className="flex-1 flex flex-col p-4 justify-center bg-zinc-50 rounded-2xl">
          <p className="text-center text-zinc-400">Feels Like</p>
          <div
            data-testid="feels-like"
            className="text-center text-2xl sm:text-3xl"
          >
            {weatherData.current.feelslike_c}°c
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
