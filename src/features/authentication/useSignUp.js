import { useMutation } from "@tanstack/react-query";
import { apiSignUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isPending: isSignUpLoad } = useMutation({
    mutationFn: apiSignUp,
    onSuccess: (e) => {
      console.log(e);
      toast.success("signUp successfully completes check email");
    },
    onError: () => toast.error("could not sign up"),
  });
  return { signUp, isSignUpLoad };
}
