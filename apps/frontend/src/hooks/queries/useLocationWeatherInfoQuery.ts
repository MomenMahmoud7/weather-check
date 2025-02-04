import axios from "axios";
import { QueryKeysT } from "../../types/queries.type";
import { useQuery } from "@tanstack/react-query";

const useLocationWeatherInfoQuery = (longitude: string, latitude: string) =>
  useQuery({
    enabled: !!longitude && !!latitude,
    queryKey: [QueryKeysT.WEATHER_INFO, latitude, longitude],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/weather`,
        {
          params: {
            latitude,
            longitude,
          },
        }
      );

      return response.data;
    },
  });

export default useLocationWeatherInfoQuery;
