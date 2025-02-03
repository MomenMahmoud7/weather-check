import { QueryKeysT } from "../../types/queries.type";
import { useQuery } from "@tanstack/react-query";

const useCityQuery = () => {
  const query = useQuery<string>({
    queryKey: [QueryKeysT.CITY],
  });

  return query.data ?? "";
};

export default useCityQuery;
