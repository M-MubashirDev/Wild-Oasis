import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: deleteBookings, isLoading: loadDelBook } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
    onError: (e) => toast.error(e.message || "Failed to delete booking"),
  });

  return { deleteBookings, loadDelBook };
}
