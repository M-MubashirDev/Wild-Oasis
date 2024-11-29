import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useBookedupdate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: mutatebooked, isLoading } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`successfull updated the ${data.id}`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (e) => toast.error(e.message),
  });
  return { mutatebooked };
}
