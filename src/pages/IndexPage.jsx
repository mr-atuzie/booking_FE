import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { shortenText } from "../utils";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [grid, setGrid] = useState(localStorage.getItem("grid"));

  useEffect(() => {
    axios
      .get("/api/v1/places/")
      .then(({ data }) => {
        setPlaces(data);
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
  }, []);

  const handleGrid = (data) => {
    setGrid(data);
    localStorage.setItem("grid", data);
    console.log(data);
  };

  console.log(grid);

  return (
    <>
      {!grid ? (
        <button
          onClick={() => handleGrid(true)}
          className=" flex items-center border gap-1  bg-transparent   rounded-full px-4 py-1 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>

          <span className=" font-medium text-sm">Grid</span>
        </button>
      ) : (
        <button
          onClick={() => handleGrid(false)}
          className=" flex items-center border gap-1  bg-transparent   rounded-full px-4 py-1 lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <span className=" text-sm font-medium">List</span>
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
                <h2 className="text-sm font-medium leading-4 ">
                  {shortenText(place.title, 35)}
                </h2>
                <p className=" text-xs    capitalize my-1 ">{place.address}</p>
                <div className=" text-sm ">
                  <span className=" font-semibold"> ${place.price}</span> per
                  night
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default IndexPage;
