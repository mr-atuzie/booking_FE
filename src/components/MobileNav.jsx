import React from "react";

const MobileNav = () => {
  return (
    <div className=" bg-white border-t bottom-0  fixed w-full py-3 flex justify-around lg:hidden">
      <div className=" flex flex-col justify-center items-center">
        <span></span>
        <p className=" text-xs">Home</p>
      </div>
      <div className=" flex flex-col justify-center items-center">
        <span></span>
        <p className=" text-xs">Add</p>
      </div>
      <div className=" flex flex-col justify-center items-center">
        <span></span>
        <p className=" text-xs">Bookings</p>
      </div>
      <div className=" flex flex-col justify-center items-center">
        <span></span>
        <p className=" text-xs">Profile</p>
      </div>
    </div>
  );
};

export default MobileNav;
