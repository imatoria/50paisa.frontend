import React, { useRef } from "react";
import { useOutletContext } from "react-router-dom";
import UserService from "../admin/helper/services/User";

const Login = () => {
  const { toggleLoader, setIsLogged, toaster } = useOutletContext();

  const refEmail = useRef();
  const refPassword = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    toggleLoader(true);
    let data = { email: refEmail.current.value, password: refPassword.current.value };
    let user = await UserService.getUserLogin(toaster, data);
    if (user) {
      UserService.authenticate(user, () => {
        toggleLoader(false);
        setIsLogged(true);
        //window.location.reload();
      });
    } else {
      toggleLoader(false);
      toaster.error("Please! Check Username & Password");
    }
  };

  return (
    <div className="col-lg-5">
      <div className="card shadow-lg border-0 rounded-lg mt-5">
        <div className="card-header card-sign-header">
          <h3 className="text-center font-weight-bolder my-2">Login</h3>
        </div>
        <div className="card-body">
          <form autoComplete="on" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label mb-0">Email*</label>
              <input className="form-control py-3" type="email" ref={refEmail} placeholder="Enter email address" name="email" />
            </div>
            <div className="mb-3">
              <label className="form-label mb-0">Password*</label>
              <input className="form-control py-3" type="password" ref={refPassword} placeholder="Enter password" name="password" />
            </div>
            <div className="form-check">
              <input className="form-check-input" id="chkRemember" type="checkbox" />
              <label className="form-check-label" htmlFor="chkRemember">
                Remember password
              </label>
            </div>
            <button className="d-flex align-items-center justify-content-between mt-4 mb-0 border-0 p-0">
              <span className="btn btn-primary hover-btn">Login</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
