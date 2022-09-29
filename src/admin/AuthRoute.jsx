import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./helper/Cookie";

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!getCookie("token")) {
      navigate("/login", { replace: true });
    }
  }, []);

  if (getCookie("token")) {
    return children;
  }
};

export default AuthRoute;
