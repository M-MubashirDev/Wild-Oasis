import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLogout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLogLoad } = useMutation({
    mutationFn: getLogout,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
    onError: () => toast.error("faild to logout"),
  });
  return { logout, isLogLoad };
}

export default useLogout;
