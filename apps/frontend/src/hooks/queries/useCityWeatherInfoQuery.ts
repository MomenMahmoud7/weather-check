import axios from "axios";
import { QueryKeysT } from "../../types/queries.type";
import { useQuery } from "@tanstack/react-query";
import useCityQuery from "./useCityQuery";

const useCityWeatherInfoQuery = () => {
  const selectedCity = useCityQuery();

  return useQuery({
    enabled: !!selectedCity,
    queryKey: [QueryKeysT.WEATHER_INFO, selectedCity],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5001/weather`, {
        params: {
          city: selectedCity,
        },
      });

      return response.data;
    },
  });
};

export default useCityWeatherInfoQuery;
