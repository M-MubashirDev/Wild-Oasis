import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { mutate: updateSetting, isPending: loadSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: function () {
      toast.success("edit successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateSetting, loadSetting };
}

export default useUpdateSetting;
