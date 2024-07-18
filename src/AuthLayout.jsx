import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import MobileNav from "./components/MobileNav";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className=" w-[95%] mx-auto ">
        <Outlet />
      </div>
      <MobileNav />
    </div>
  );
};

export default AuthLayout;
