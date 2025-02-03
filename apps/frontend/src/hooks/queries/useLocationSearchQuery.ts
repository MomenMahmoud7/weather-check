import axios from "axios";
import { QueryKeysT } from "../../types/queries.type";
import { useQuery } from "@tanstack/react-query";

const useLocationSearchQuery = (text: string) =>
  useQuery({
    enabled: !!text,
    queryKey: [QueryKeysT.LOCATION_SEARCH, text],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:5001/search`, {
        params: {
          query: text,
        },
      });

      return response.data;
    },
  });

export default useLocationSearchQuery;
