import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCabin, isLoading: deleteloading } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: function () {
      toast.success("toast is completed");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteCabin, deleteloading };
}

export default useDeleteCabin;
