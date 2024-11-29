import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { useAuth } from "../features/authentication/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullSpinner = styled.div`
  display: grid;
  height: 100vh;
  place-content: center;
`;
function ProtectedLogin({ children }) {
  //create a parent component
  //that will return the whole app if there is session otherwise redirect to the login page
  const { user, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, navigate, isLoading]
  );
  if (isLoading)
    return (
      <FullSpinner>
        <Spinner />
      </FullSpinner>
    );

  if (isAuthenticated) return <div>{children}</div>;
}

export default ProtectedLogin;
