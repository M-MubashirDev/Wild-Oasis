import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBooking() {
  const [searchParam] = useSearchParams();
  const numDays = !searchParam.get("last")
    ? 7
    : Number(searchParam.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: bookingRecent, isLoading: isRecentLoad } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });
  return { bookingRecent, isRecentLoad };
}

export default useRecentBooking;
