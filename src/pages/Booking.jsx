import React from "react";
import { useParams } from "react-router-dom";

const Booking = () => {
  const { id } = useParams();

  console.log(id);
  return <div>Booking {id}</div>;
};

export default Booking;
