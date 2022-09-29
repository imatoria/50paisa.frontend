import React, { useEffect, useState } from "react";
import AdminRoute from "./admin/AdminRoute";
import Home from "./pages/Home";
// import Auth from './components/auth';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error404 from "./admin/pages/Error404";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import PrivateRoute from './components/auth/PrivateRoute';
import { getCookie } from "./admin/helper/Cookie";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./Layout";
import AuthRoute from "./admin/AuthRoute";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogged, setIsLogged] = useState(false);
  if (isLogged === false && (getCookie("token") || localStorage.getItem("token"))) {
    setIsLogged(true);
  }

  useEffect(() => {
    if (isLogged === true && location.pathname.startsWith("/admin/") === false) {
      navigate("/admin/", { replace: true });
    }
  }, [isLogged, location.pathname]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Routes>
        <Route path="/" element={<Layout isLogged={isLogged} setIsLogged={setIsLogged} />}>
          <Route index element={<Home />} />
          {/* <Route exact path="/auth" element={Auth} /> */}
          {isLogged === false && <Route path="/login" element={<Login />} />}
          {isLogged === false && <Route path="/register" element={<Register />} />}
          <Route
            path="/admin/*"
            element={
              <AuthRoute>
                <AdminRoute />
              </AuthRoute>
            }
          />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
