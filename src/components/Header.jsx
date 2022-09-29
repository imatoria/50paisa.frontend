import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand navbar-light fixed-top border-bottom border-dark ps-3 pe-3">
        <a className="navbar-brand logo-brand font-weight-bold navbar-nav me-auto mb-2 mb-lg-0" href="/">
          50 Paisa
        </a>
        <ul className="nav justify-content-end d-flex">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
