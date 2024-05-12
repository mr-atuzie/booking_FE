import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import PlacesPage from "./PlacesPage";
import AccountNav from "../components/AccountNav";

const Account = () => {
  const { subpage } = useParams();
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
      {subpage === undefined && (
        <div className=" text-center lg:max-w-lg mx-auto">
          <p>
            Logged in as {user?.name} {user?.email}
            <button onClick={logout} className=" primary max-w-sm mt-2">
              Logout
            </button>
          </p>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default Account;
