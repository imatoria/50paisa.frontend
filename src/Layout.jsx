import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import AdminHeader from "./admin/components/Header";
import Loader from "./components/Loader";
import Footer from "./components/Footer";
import { toast } from "react-toastify";

const Layout = ({ isLogged, setIsLogged }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleLoader = (flag) => {
    setIsLoaded(typeof flag === "undefined" ? !isLoaded : flag);
  };

  const toastOption = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
  const toaster = {
    error: (message) => {
      toast.error(message, toastOption);
    },
    success: (message) => {
      toast.success(message, toastOption);
    },
  };

  return (
    <>
      {isLogged ? <AdminHeader /> : <Header />}
      <main className="flex-shrink-0 mb-3">
        <div className="container-fluid">
          {isLoaded ? <Loader /> : ""}
          <div className="row justify-content-center">
            {/* An <Outlet> renders whatever child route is currently active,
                so you can think about this <Outlet> as a placeholder for
                the child routes we defined above. */}
            <Outlet context={{ toggleLoader, setIsLogged, toaster }} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
