import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container-grid ">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-around py-3 mb-4 border-bottom text-bg-dark p-3 ">
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link className="nav-link px-2" to="/">
              Home
            </Link>
          </li>
        </ul>
        <div className="col-md-3 text-end">
          <Link to="/login">
            <button type="button" className="btn btn-outline-primary me-2">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button type="button" className="btn btn-primary">
              Sign-up
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
