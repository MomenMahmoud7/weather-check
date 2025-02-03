import useCityWeatherInfoQuery from "../../hooks/queries/useCityWeatherInfoQuery";
import { QueryKeysT } from "../../types/queries.type";
import queryClient from "../../configs/query";
import CityAutocomplete from "../CityAutocomplete/CityAutocomplete";
import WeatherDisplay from "../WeatherDisplay/WeatherDisplay";

const CitySearch = () => {
  const { data: cityWeather, isLoading: isCityLoading } =
    useCityWeatherInfoQuery();

  const onSelect = (value: string) => {
    queryClient.setQueryData([QueryKeysT.CITY], value);
  };

  return (
    <div className="space-y-8">
      <CityAutocomplete
        onSelect={onSelect}
        placeholder="Search for a city..."
      />
      <WeatherDisplay weatherData={cityWeather} isLoading={isCityLoading} />
    </div>
  );
};

export default CitySearch;
