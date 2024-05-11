import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex py-4 flex-col min-h-screen">
      <div className=" w-[95%] mx-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
