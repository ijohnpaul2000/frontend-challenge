import React from "react";
import Nav from "../ui/Nav";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
