import { HiArrowRightEndOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
function Logout() {
  const { logout, isLogLoad } = useLogout();
  return (
    <ButtonIcon disabled={isLogLoad} onClick={() => logout()}>
      {isLogLoad ? <SpinnerMini /> : <HiArrowRightEndOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
