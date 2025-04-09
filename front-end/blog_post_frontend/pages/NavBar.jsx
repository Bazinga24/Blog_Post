// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={() => navigate("/")}>
          MyBlog
        </div>
        <div className="nav-links">
          <div className="link-text">
            {" "}
            <Link to="/">Home</Link>
          </div>
          {isAuthenticated && (
            <div className="link-text">
              <Link to="/create">Create</Link>
            </div>
          )}
          {!isAuthenticated ? (
            <>
              <div className="link-text">
                <Link to="/signup">SignUp</Link>
              </div>
              <div className="link-text">
                <Link to="/login">Login</Link>
              </div>
            </>
          ) : (
            <div className="link-text">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
