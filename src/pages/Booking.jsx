import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { USDollar } from "../utils";

const Booking = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    axios
      .get("/api/v1/places/bookings/" + id)
      .then(({ data }) => {
        setBooking(data);
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        toast.error(message);
        console.log(error);
      });
  }, [id]);

  if (showAllPhotos) {
    return (
      <div className="absolute z-50 inset-0  bg-black min-h-screen ">
        <div className=" grid gap-4 w-full mb-32 bg-black p-4 lg:p-24 ">
          <div>
            <h2 className="font-medium mr-28    lg:text-2xl mb-2 text-white">
              Photos of {booking.place.title}
            </h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className=" text-xs fixed right-8 top-8 shadow-md shadow-black flex gap-1 items-center py-2 px-4 rounded-2xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="lg:w-6 w-4 lg:h-6 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
              Close
            </button>
          </div>
          {booking.place.photos.length > 0 &&
            booking.place.photos.map((photo, index) => {
              return (
                <div key={index}>
                  <img className=" w-full object-cover" src={photo} alt="" />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  if (!booking) {
    return "Loading...";
  }

  return (
    <div className="mt-4  lg:mt-8 lg:w-[65%] lg:mx-auto">
      <h1 className="text-lg leading-5 font-medium lg:text-2xl">
        {booking.place?.title}
      </h1>
      <a
        href={"https://maps.google.com/?q=" + booking.place?.address}
        target="_blank"
        rel="noreferrer"
        className="underline my-2 flex gap-1 items-center capitalize text-sm lg:text-base"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 lg:w-6 h-4 lg:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {booking.place?.address}
      </a>
      <div className="relative">
        <div className="grid gap-2  grid-cols-[2fr_1fr]  rounded-2xl overflow-hidden ">
          <div>
            {booking.place?.photos?.[0] && (
              <div>
                {booking.place.photos?.[0] && (
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className=" object-cover aspect-square "
                    src={booking.place?.photos[0]}
                    alt=""
                  />
                )}
              </div>
            )}
          </div>
          <div className=" grid ">
            {booking.place?.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="object-cover aspect-square "
                src={booking.place?.photos[1]}
                alt=""
              />
            )}

            <div className=" overflow-hidden">
              {booking.place?.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="object-cover aspect-square relative top-2 "
                  src={booking.place?.photos[2]}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className=" flex gap-1 items-center text-xs bg-opacity-80 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl  shadow-md shadow-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="lg:w-6 w-4 h-4 lgh-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clipRule="evenodd"
            />
          </svg>
          Show more photos
        </button>
      </div>
      <div className=" bg-gray-200  mt-3 p-2 rounded-2xl">
        <p className=" text-xs  font-medium flex items-center gap-2 mb-2">
          <span className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
            {differenceInCalendarDays(
              new Date(booking.checkOut),
              new Date(booking.checkIn)
            )}{" "}
            nights
          </span>
          |
          <span className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            {format(new Date(booking.checkIn), "yyyy-MM-dd")}
          </span>
          &rarr;
          <span className=" flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            {format(new Date(booking.checkOut), "yyyy-MM-dd")}
          </span>
        </p>

        <p className=" text-xs flex items-center font-medium gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
            />
          </svg>
          ${USDollar.format(booking.price)}
        </p>
      </div>
      <div className=" my-2">
        <h2 className=" font-medium">Description</h2>
        <p className=" text-sm text-gray-700">{booking.place.description}</p>
      </div>
      {/* <h1 className=" text-gray-700">
        <span className=" font-semibold text-black">
          Price: ${booking.place.price}
        </span>
        /per night
      </h1> */}
    </div>
  );
};

export default Booking;
