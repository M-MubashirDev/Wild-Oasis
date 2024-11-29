import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBooking() {
  const [params] = useSearchParams();
  const statusParams = params.get("status");
  const queryClient = useQueryClient();
  const filter =
    !params && statusParams === "all"
      ? null
      : { statusName: "status", statusValue: statusParams };
  const sortParam = params?.get("sort") || "startDate-desc";
  const [head, tail] = sortParam.split("-");
  const sort = { sortColumn: head, sortDirect: tail };
  //pagination
  let startCount = !params.get("page") ? 1 : Number(params.get("page"));
  const {
    data: { data: bookingData, count } = {},
    isLoading: isLoadingBook,
    error: errorBooking,
  } = useQuery({
    queryKey: ["booking", filter, sort, startCount],
    queryFn: () => getBooking({ filter, sort, startCount }),
  });
  queryClient.prefetchQuery({
    queryKey: ["booking", filter, sort, startCount + 1],
    queryFn: () => getBooking({ filter, sort, startCount: startCount + 1 }),
  });
  queryClient.prefetchQuery({
    queryKey: ["booking", filter, sort, startCount - 1],
    queryFn: () => getBooking({ filter, sort, startCount: startCount - 1 }),
  });
  return { bookingData, count, isLoadingBook, errorBooking };
}
