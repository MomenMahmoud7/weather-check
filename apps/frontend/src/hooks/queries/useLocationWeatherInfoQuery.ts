import axios from "axios";
import { QueryKeysT } from "../../types/queries.type";
import { useQuery } from "@tanstack/react-query";

const useLocationWeatherInfoQuery = (longitude: string, latitude: string) =>
  useQuery({
    enabled: !!longitude && !!latitude,
    queryKey: [QueryKeysT.WEATHER_INFO, latitude, longitude],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5001/weather`, {
        params: {
          latitude,
          longitude,
        },
      });

      return response.data;
    },
  });

export default useLocationWeatherInfoQuery;
