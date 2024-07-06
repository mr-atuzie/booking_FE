import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import MobileNav from "./components/MobileNav";

import SideBar from "./components/SideBar";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="lg:flex ">
        <SideBar />
        <div className=" h-full lg:ml-[20%] lg:w-[80%] px-4 lg:px-10   lg:bg-gray-50  ">
          <Outlet />
        </div>
      </div>
      <MobileNav />
    </div>
  );
};

export default Layout;
