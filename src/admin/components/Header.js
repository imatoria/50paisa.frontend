import React from "react";
import { Link } from "react-router-dom";
import { User } from "../helper/services/Index";

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand navbar-light fixed-top border-bottom border-dark ps-3 pe-3">
        <a className="navbar-brand logo-brand font-weight-bold navbar-nav me-auto mb-2 mb-lg-0" href="/admin/">
          50 Paisa
        </a>
        <ul className="nav justify-content-end d-flex">
          <li className="nav-item">
            <Link className="nav-link" to="/admin/">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/catalog/">
              Catalog
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/upload/">
              Upload
            </Link>
          </li>
          <li className="nav-item">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#dropdown" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-user fa-fw" />
                </a>
                <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  <Link className="dropdown-item admin-dropdown-item" to="/admin/profile">
                    Profile
                  </Link>
                  <a className="dropdown-item admin-dropdown-item" href="#logout" onClick={() => User.logout()}>
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
