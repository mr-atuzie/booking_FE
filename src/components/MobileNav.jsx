import React from "react";

const MobileNav = () => {
  return (
    <div className=" bg-white border-t bottom-0  fixed w-full py-3 flex justify-around lg:hidden">
      <div className=" flex flex-col justify-center gap-1 items-center">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="lg:w-6 lg:h-6 w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
            />
          </svg>
        </span>
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
      <div className=" flex flex-col gap-1 justify-center items-center">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="lg:w-6 lg:h-6 w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </span>
        <p className=" text-xs">Profile</p>
      </div>
    </div>
  );
};

export default MobileNav;
