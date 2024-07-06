import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className=" w-[95%] mx-auto ">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
