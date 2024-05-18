import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const Account = () => {
  // const { subpage } = useParams();
  const { user, ready, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/logout");
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
    return "Loading";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />

      <div className=" text-center lg:max-w-lg mx-auto">
        <h1 className=" font-medium text-sm">
          Name: <span className=" text-gray-700">{user?.name}</span>
        </h1>
        <p className=" font-medium text-sm">
          Email: <span className=" text-gray-700">{user?.email}</span>
        </p>
        <button onClick={logout} className=" primary max-w-sm mt-2">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
