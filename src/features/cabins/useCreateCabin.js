import toast from "react-hot-toast";
import { insertCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: CreateCabin, isLoading: isInserted } = useMutation({
    mutationFn: insertCabin,
    onSuccess: function () {
      toast.success("inserted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return { CreateCabin, isInserted };
}

export default useCreateCabin;
