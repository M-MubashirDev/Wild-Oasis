import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: mutateEdit, isPending: loadEdit } = useMutation({
    mutationFn: (dataSent) => insertCabin(dataSent),
    onSuccess: function () {
      toast.success("edit successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      // reset();
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutateEdit, loadEdit };
}

export default useEditCabin;
