import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkedOut, isLoading: isCheckedOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`successfull checked out the ${data.id}`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (e) => toast.error(e.message),
  });
  return { checkedOut, isCheckedOut };
}
