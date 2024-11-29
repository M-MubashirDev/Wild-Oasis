import { useQuery } from "@tanstack/react-query";
import apiCabins from "../../services/apiCabins";

function useCabin() {
  const {
    data: cabinData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: apiCabins,
  });
  return { cabinData, isLoading, error };
}

export default useCabin;
