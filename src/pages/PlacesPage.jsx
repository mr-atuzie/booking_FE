import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import toast from "react-hot-toast";
import { shortenText } from "../utils";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/v1/places/user-place")
      .then(({ data }) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        toast.error(message);
        console.log(error);
      });
  }, []);

  if (loading) {
    return "Loading...";
  }

  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <Link
          className=" inline-flex gap-1 text-sm lg:text-base rounded-full  bg-primary text-white py-2 px-6"
          to={"/add-place"}
        >
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
          Add new place
        </Link>
      </div>

      <div className=" mt-4 mb-32">
        {places.length > 0 &&
          places.map((place) => {
            return (
              <Link
                to={"/update-place/" + place._id}
                className=" flex cursor-pointer mb-2 gap-2 lg:gap-4 bg-gray-100 overflow-hidden  rounded-2xl"
                key={place._id}
              >
                <div className=" w-28 h-28 lg:h-32 lg:w-32 flex  bg-gray-300 grow shrink-0 ">
                  {place.photos.length > 0 && (
                    <img
                      className=" object-cover"
                      src={place.photos[0]}
                      alt=""
                    />
                  )}
                </div>

                <div className=" p-2 grow-0 shrink">
                  <h2 className=" font-medium leading-4 capitalize text-sm lg:text-base">
                    {place.title}
                  </h2>
                  <p className=" text-xs  mt-1 lg:hidden">
                    {shortenText(place.description, 150)}
                  </p>

                  <p className=" hidden lg:block text-sm">
                    {place.description}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default PlacesPage;
