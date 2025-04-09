import React from "react";
import NavBar from "../pages/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: "60px" }}>
        {/* Prevents overlap with fixed nav */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
