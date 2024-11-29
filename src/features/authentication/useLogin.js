import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAuth } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoginLoad } = useMutation({
    mutationFn: ({ email, password }) => apiAuth({ email, password }),
    onSuccess: (data) => {
      navigate("/");
      queryClient.setQueryData(["auth"], data.user);
    },
    onError: () => toast.error("invalid"),
  });
  return { login, isLoginLoad };
}
