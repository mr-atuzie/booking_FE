import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/places/")
      .then(({ data }) => {
        setPlaces([...data, ...data, ...data]);
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
          return (
            <Link to={"/place/" + place._id} key={index}>
              <div className=" bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square "
                    src={
                      process.env.REACT_APP_BACKEND_URI +
                      "/uploads/" +
                      place.photos[0]
                    }
                    alt=""
                  />
                )}
              </div>
              <p className=" text-xs font-medium  capitalize ">
                {place.address}
              </p>
              <h2 className="text-sm truncate font-medium  text-gray-600 ">
                {place.title}
              </h2>
              <div className=" text-sm mt-1">
                <span className=" font-bold"> ${place.price}</span> per night
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default IndexPage;
