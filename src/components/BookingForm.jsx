import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { USDollar } from "../utils";

const BookingForm = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  let numberOfDays = 0;

  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/places/book", {
        name,
        mobile,
        checkIn,
        checkOut,
        maxGuests,
        price: numberOfDays * place?.price,
        place: place._id,
      });
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <h1 className="  text-center text-gray-500">
          <span className=" font-semibold text-black">
            Price: ${place.price}
          </span>
          /per night
        </h1>
        <div className=" border-2 rounded-2xl  mt-4">
          <div className=" flex gap-2  items-center">
            <div className=" w-[50%] p-2">
              <label className=" text-xs font-medium">Check in:</label>
              <input
                className=" bg-gray-200 text-xs w-full"
                type="date"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
                required
              />
            </div>

            <div className="  w-[50%]  border-l-2 p-2">
              <label className="text-xs font-medium">Check out:</label>
              <input
                className=" bg-gray-200 text-xs w-full"
                type="date"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
                required
              />
            </div>
          </div>

          <div className=" p-2  border-t-2">
            <label className=" text-xs font-medium">Number of guests</label>
            <input
              className=" text-xs bg-gray-200"
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              required
            />
          </div>
          {numberOfDays > 0 && (
            <div>
              <div className=" px-2  ">
                <label className=" text-xs font-medium">Your Fullname</label>
                <input
                  className=" text-xs bg-gray-200"
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
              </div>

              <div className="  px-2  mb-2 ">
                <label className=" text-xs font-medium">Phone Number</label>
                <input
                  className=" text-xs bg-gray-200"
                  type="text"
                  value={mobile}
                  onChange={(ev) => setMobile(ev.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="primary text-sm mt-4">
          Book
          {numberOfDays > 0 && (
            <span>
              {" "}
              for ${USDollar.format(numberOfDays * place?.price)} -{" "}
              {numberOfDays} night
              {numberOfDays > 1 ? "s" : ""}
            </span>
          )}
        </button>
      </form>
    </>
  );
};

export default BookingForm;
