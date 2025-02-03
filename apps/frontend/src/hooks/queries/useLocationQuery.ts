import { QueryKeysT } from "../../types/queries.type";
import { useQuery } from "@tanstack/react-query";

const useLocationQuery = () => {
  const query = useQuery<{ latitude: string; longitude: string }>({
    queryKey: [QueryKeysT.LOCATION],
  });

  return query.data ?? { latitude: "", longitude: "" };
};

export default useLocationQuery;
