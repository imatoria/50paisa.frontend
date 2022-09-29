import React, { useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import User from "../admin/helper/services/User";

const Register = () => {
  const { toggleLoader, toaster } = useOutletContext();

  const refName = useRef();
  const refMobile = useRef();
  const refEmail = useRef();
  const refUsername = useRef();
  const refPassword = useRef();
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    toggleLoader(true);

    let data = {
      name: refName.current.value,
      mobile: refMobile.current.value,
      email: refEmail.current.value,
      username: refUsername.current.value,
      password: refPassword.current.value,
    };
    let user = await User.getUserRegister(data);
    if (user) {
      setRedirectToReferrer(true);
      toggleLoader(false);
      window.location.reload();
    } else {
      toggleLoader(false);
      toaster.error("Error! Please try again later");
    }
  };

  const navigate = useNavigate();
  if (redirectToReferrer === true || localStorage.getItem("token")) {
    navigate("/auth/login", { replace: true });
  }

  return (
    <div className="col-lg-5">
      <div className="card shadow-lg border-0 rounded-lg mt-5">
        <div className="card-header card-sign-header">
          <h3 className="text-center font-weight-bolder my-2">Register</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label mb-0">Name*</label>
              <input className="form-control py-3" type="text" ref={refName} placeholder="Enter Name" name="name" />
            </div>
            <div className="mb-3">
              <label className="form-label mb-0">Mobile*</label>
              <input className="form-control py-3" type="number" ref={refMobile} placeholder="Enter Mobile" name="mobile" />
            </div>
            <div className="mb-3">
              <label className="form-label mb-0">Email*</label>
              <input className="form-control py-3" type="email" ref={refEmail} placeholder="Enter Email Address" name="email" />
            </div>
            <div className="mb-3">
              <label className="form-label mb-0">Username*</label>
              <input className="form-control py-3" type="text" ref={refUsername} placeholder="Enter User Name" name="username" />
            </div>
            <div className="mb-3">
              <label className="form-label mb-0">Password*</label>
              <input className="form-control py-3" type="password" ref={refPassword} placeholder="Enter Password" name="password" />
            </div>

            <button className="d-flex align-items-center justify-content-between mt-4 mb-0 border-0 p-0">
              <span className="btn btn-primary hover-btn">Submit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
