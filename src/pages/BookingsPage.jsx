import React, { useContext } from "react";
import AccountNav from "../components/AccountNav";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const BookingsPage = () => {
  const { user, ready } = useContext(UserContext);

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <AccountNav />
    </div>
  );
};

export default BookingsPage;
