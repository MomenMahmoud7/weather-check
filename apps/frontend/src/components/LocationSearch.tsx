import Input from "./ui/Input";
import useLocationWeatherInfoQuery from "../hooks/queries/useLocationWeatherInfoQuery";
import { ChangeEvent, useState } from "react";
import useLocationQuery from "../hooks/queries/useLocationQuery";
import queryClient from "../configs/query";
import { QueryKeysT } from "../types/queries.type";
import WeatherDisplay from "./WeatherDisplay/WeatherDisplay";

const LocationSearch = () => {
  const location = useLocationQuery();
  const [latitude, setLatitude] = useState(location.latitude);
  const [longitude, setLongitude] = useState(location.latitude);

  const { data: locationWeather, isLoading: isLocationLoading } =
    useLocationWeatherInfoQuery(location.latitude, location.longitude);

  const handleSubmit = () => {
    queryClient.setQueryData([QueryKeysT.LOCATION], {
      latitude,
      longitude,
    });
  };

  const onLatitudeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLatitude(value);
  };

  const onLongitudeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLongitude(value);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Input
          type="number"
          min={-90}
          max={90}
          value={latitude}
          onChange={onLatitudeChange}
          placeholder="Latitude (-90 to 90)"
          className={`w-40 ${+latitude > 90 || +latitude < -90 ? "border-red-300" : "border-zinc-200"}`}
        />
        <Input
          type="number"
          min={-180}
          max={180}
          value={longitude}
          onChange={onLongitudeChange}
          placeholder="Longitude (-180 to 180)"
          className={`w-40 ${+longitude > 180 || +longitude < -180 ? "border-red-300" : "border-zinc-200"}`}
        />
        <button
          onClick={handleSubmit}
          className="
            px-6 py-3
            bg-black
            text-white
            text-sm
            rounded-md
            cursor-pointer
            transition-all duration-300
            disabled:opacity-50
            disabled:cursor-not-allowed
            hover:bg-zinc-800
          "
          disabled={
            !latitude ||
            !longitude ||
            +latitude > 90 ||
            +latitude < -90 ||
            +longitude > 180 ||
            +longitude < -180
          }
        >
          SUBMIT
        </button>
      </div>
      <WeatherDisplay
        weatherData={locationWeather}
        isLoading={isLocationLoading}
      />
    </div>
  );
};

export default LocationSearch;
