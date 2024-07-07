import axios from "axios";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import toast from "react-hot-toast";

const SideBar = () => {
  const navigate = useNavigate("");
  const { setUser } = useContext(UserContext);
  const logout = async () => {
    try {
      await axios.get("/api/v1/user/logout");
      setUser(null);
      toast.success("logout successfull");
      navigate("/");
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);
      console.log(error);
    }
  };
  return (
    <div className=" fixed min-h-full  left-0 shadow-lg hidden p-8 lg:flex  flex-col  lg:w-[20%]">
      <div className=" flex gap-8 flex-col ">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? " text-primary" : "")}
        >
          <div className=" flex   gap-3 ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
            </span>
            <p className="">Home</p>
          </div>
        </NavLink>

        <NavLink
          to="/add-place"
          className={({ isActive }) => (isActive ? " text-primary" : "")}
        >
          <div className=" flex  gap-3 ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
            <p>Add Property</p>
          </div>
        </NavLink>

        <NavLink
          to="/bookings"
          className={({ isActive }) => (isActive ? " text-primary" : "")}
        >
          <div className=" flex gap-3 ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </span>
            <p>My Bookings</p>
          </div>
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) => (isActive ? " text-primary" : "")}
        >
          <div className=" flex  gap-3 ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </span>
            <p>Profile</p>
          </div>
        </NavLink>

        <NavLink
          to="/places"
          className={({ isActive }) => (isActive ? " text-primary" : "")}
        >
          <div className=" flex  gap-3 ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                />
              </svg>
            </span>
            <p>My Listings</p>
          </div>
        </NavLink>
      </div>

      <button onClick={logout} className=" primary max-w-sm mt-20">
        Logout
      </button>
    </div>
  );
};

export default SideBar;
