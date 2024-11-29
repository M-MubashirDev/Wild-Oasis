import { useEffect } from "react";

function useClickEvent(ref, workFun) {
  useEffect(
    function () {
      function handle(e) {
        if (ref.current && !ref.current?.contains(e.target)) {
          workFun();
        }
      }
      document.addEventListener("click", handle, true);
      return () => document.removeEventListener("click", handle, true);
    },
    [workFun, ref]
  );
}

export default useClickEvent;
