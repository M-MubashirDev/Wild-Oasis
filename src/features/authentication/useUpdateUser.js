import toast from "react-hot-toast";
import { apiUpdate } from "../../services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updatedUser, isPending: isUserLoad } = useMutation({
    mutationFn: apiUpdate,
    onSuccess: (e) => {
      console.log(e);
      toast.success("signUp successfully completes check email");
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: () => toast.error("could not sign up"),
  });
  return { updatedUser, isUserLoad };
}
