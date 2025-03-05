import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../utils/api";

const useProperties = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allProperties"],
    queryFn: getAllProperties,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useProperties;
