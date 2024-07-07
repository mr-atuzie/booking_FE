import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";
import Loader from "../components/Loader";

const Account = () => {
  // const { subpage } = useParams();
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/logout");
      toast.success("Logout successfull");
      setRedirect("/");
      setUser(null);
      console.log(data);
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

  if (!ready) {
    return <Loader />;
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className=" min-h-screen">
      <AccountNav />

      <div className="  lg:bg-white lg:shadow-lg lg:p-8 lg:rounded-xl lg:max-w-lg mx-auto">
        <h1 className=" font-medium text-sm lg:text-base">
          Name: <span className=" capitalize ">{user?.name}</span>
        </h1>
        <p className=" font-medium text-sm lg:text-base">
          Email: <span className=" ">{user?.email}</span>
        </p>

        <div className=" flex justify-center items-center my-8">
          <button onClick={logout} className=" primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
