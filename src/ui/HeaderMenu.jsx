import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineMoon, HiOutlineSun, HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "./DarkModeToggle";

const Menu = styled.ul`
  display: flex;
  gap: 0.5rem;
`;
function HeaderMenu() {
  const { isDarkMode, ToggleDarkMode } = useDarkMode();

  const navigate = useNavigate();
  return (
    <Menu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li onClick={ToggleDarkMode}>
        <ButtonIcon>
          {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
      </li>
      <li>
        <Logout />
      </li>
    </Menu>
  );
}

export default HeaderMenu;
