import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooked } from "../../services/apiBookings";
// for the single id i think
export function useBooked() {
  const { id: cabinId } = useParams();
  const { data: bookedData, isLoading: isbookedLoad } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getBooked({ cabinId }),
  });
  return { bookedData, isbookedLoad };
}
