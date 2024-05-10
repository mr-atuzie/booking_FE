import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex p-4 flex-col min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
