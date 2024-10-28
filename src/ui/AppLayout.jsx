import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;
const StyledMainAPPLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;
const DivCenter = styled.div`
  max-width: 120rem;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
function AppLayout() {
  return (
    <StyledMainAPPLayout>
      <Header />
      <SideBar />
      <Main>
        <DivCenter>
          <Outlet />
        </DivCenter>
      </Main>
    </StyledMainAPPLayout>
  );
}

export default AppLayout;
