import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

function useRecentStays() {
  const [searchParam] = useSearchParams();
  const numDays = !searchParam.get("last")
    ? 7
    : Number(searchParam.get("last"));
  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: recentStays, isLoading: isStayLoad } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });
  const filterStays = recentStays?.filter(
    (val) => val.status === "checked-in" || val.status === "checked-out"
  );
  return { recentStays, isStayLoad, filterStays, numDays };
}

export default useRecentStays;
