import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const PlacePage = () => {
  const [place, setPlace] = useState(null);
  const { id } = useParams();

  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    axios
      .get("/api/v1/places/" + id)
      .then(({ data }) => {
        setPlace(data);
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

  if (!place) {
    return "Loading...";
  }

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 mb-32 bg-black min-h-screen ">
        <div className=" grid gap-4 w-full bg-black p-4 lg:p-24 ">
          <div>
            <h2 className="font-medium text-lg   lg:text-2xl mb-2 text-white">
              Photos of {place.title}
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
              {/* Close photos */}
            </button>
          </div>
          {place.photos.length > 0 &&
            place.photos.map((photo, index) => {
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

  return (
    <div className="mt-4 mb-32 lg:mt-8 lg:w-[65%] lg:mx-auto">
      <h1 className="text-lg leading-5 font-medium lg:text-2xl">
        {place?.title}
      </h1>
      <a
        href={"https://maps.google.com/?q=" + place?.address}
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

        {place?.address}
      </a>
      <div className="relative">
        <div className="grid gap-2  grid-cols-[2fr_1fr]  rounded-2xl overflow-hidden ">
          <div>
            {place?.photos?.[0] && (
              <div>
                {place.photos?.[0] && (
                  <img
                    className=" object-cover aspect-square "
                    src={place?.photos[0]}
                    alt=""
                  />
                )}
              </div>
            )}
          </div>
          <div className=" grid ">
            {place?.photos?.[1] && (
              <img
                className="object-cover aspect-square "
                src={place?.photos[1]}
                alt=""
              />
            )}

            <div className=" overflow-hidden">
              {place?.photos?.[2] && (
                <img
                  className="object-cover aspect-square relative top-2 "
                  src={place?.photos[2]}
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
      <div className=" my-3">
        <h2 className=" font-medium">Description</h2>
        <p className=" text-sm text-gray-500">{place.description}</p>
      </div>
      <div className=" grid gap-2  lg:grid-cols-2">
        {/* <div className=" text-sm">
          <span className=" font-medium">Check in:</span> {place.checkIn} AM
          <br />
          <span className=" font-medium">Check out:</span> {place.checkOut} PM
          <br />
          <span className=" font-medium">Max number of guests:</span>{" "}
          {place.maxGuests}
        </div> */}

        <div className=" border rounded-2xl p-2 mt-4">
          <h1 className=" text-sm  text-center text-gray-500">
            <span className=" font-semibold text-black"> ${place.price}</span>
            /per night
          </h1>
          <div className=" ">
            <label className=" text-xs font-medium">Check in:</label>
            <input
              className=" bg-gray-200 text-xs w-full"
              type="date"
              name=""
              id=""
            />
          </div>

          <div className=" ">
            <label className="text-xs font-medium">Check out:</label>
            <input
              className=" bg-gray-200 text-xs w-full"
              type="date"
              name=""
              id=""
            />
          </div>

          <div className=" ">
            <label className=" text-xs font-medium">Number of guests</label>
            <input className=" text-xs bg-gray-200" type="number" />
          </div>

          <button className="primary text-sm mt-4">Book this place</button>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
