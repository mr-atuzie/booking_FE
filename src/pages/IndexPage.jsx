import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { USDollar, shortenText } from "../utils";
import Loader from "../components/Loader";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [grid, setGrid] = useState(localStorage.getItem("grid"));

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/v1/places/")
      .then(({ data }) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        toast.error(message);
        console.log(error);
      });
  }, []);

  const handleGrid = (data) => {
    setGrid(data);
    localStorage.setItem("grid", data);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!grid ? (
        <button
          onClick={() => handleGrid(true)}
          className=" bg-primary text-white flex items-center my-3  gap-1 min-w-10 border shadow-md  rounded-lg px-4 py-1 lg:hidden"
        >
          <span className=" font-medium text-sm">Filter</span>
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
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={() => handleGrid(false)}
          className=" bg-primary my-3 text-white flex items-center  gap-1 min-w-10 border shadow-md  rounded-lg px-4 py-1 lg:hidden"
        >
          <span className=" text-sm font-medium">Filter</span>
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
              d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
            />
          </svg>
        </button>
      )}

      <div
        className={`${
          !grid ? "grid-cols-1" : " grid-cols-2"
        } mt-3 mb-32 lg:mt-8 grid gap-3 lg:gap-8  md:grid-cols-3 lg:grid-cols-4`}
      >
        {places.length > 0 &&
          places.map((place, index) => {
            return (
              <Link to={"/place/" + place._id} key={index}>
                <div className=" bg-gray-500 mb-2 rounded-2xl flex">
                  {place.photos?.[0] && (
                    <img
                      className="rounded-2xl max-h-56 w-full object-cover aspect-square "
                      src={place.photos[0]}
                      alt=""
                    />
                  )}
                </div>
                <h2 className="text-sm lg:text-base capitalize truncate font-medium ">
                  {shortenText(place.title, 35)}
                </h2>
                <p className=" text-xs lg:text-sm  text-gray-800 my-0.5 lg:my-0     capitalize  ">
                  {place.address}
                </p>
                <p className=" text-xs lg:text-sm lg:font-medium  ">
                  <span className=" font-medium text-black">
                    ${USDollar.format(place.price)}
                  </span>{" "}
                  per night
                </p>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default IndexPage;
