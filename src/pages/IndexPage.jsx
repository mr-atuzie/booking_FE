import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { shortenText } from "../utils";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
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

  return (
    <div className="mt-4 lg:mt-8 gap-3 lg:gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, index) => {
          console.log(place);
          return (
            <Link to={"/place/" + place._id} key={index}>
              <div className=" bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square "
                    src={place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="text-sm font-medium leading-4 truncate">
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
  );
};

export default IndexPage;
