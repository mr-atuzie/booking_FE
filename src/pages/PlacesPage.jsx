import React from "react";
import { Link, useParams } from "react-router-dom";

const PlacesPage = () => {
  const { action } = useParams();
  console.log(action);
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className=" inline-flex gap-1 text-sm lg:text-base rounded-full  bg-primary text-white py-2 px-6"
            to={"/account/places/new"}
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
      )}

      {action === "new" && (
        <div>
          <form>
            <h2 className=" lg:text-xl mt-4">Title</h2>
            <p className=" text-gray-500 -mt-1 text-xs lgtext-sm ">
              title should be short and catchy
            </p>
            <input
              className=" text-sm placeholder:text-sm placeholder:font-light"
              type="text"
              placeholder=" for example: 2 bed room duplex"
            />
            <h2 className=" lg:text-xl mt-4">Address</h2>
            <p className=" text-gray-500 -mt-1 text-xs lgtext-sm">
              addres to this place
            </p>
            <input
              className=" text-sm placeholder:text-sm placeholder:font-light"
              type="text"
              placeholder="address"
            />
            <h2 className=" lg:text-xl mt-4">Photos</h2>
            <p className=" text-gray-500 -mt-1 text-xs lgtext-sm">
              more is better
            </p>
            <div className=" flex gap-2">
              <input
                className=" text-sm placeholder:text-sm placeholder:font-light"
                type="text"
                placeholder="Add using a link...jpg"
              />
              <button className=" bg-gray-200 text-sm lg:text-base px-2 lg:px-4 rounded-2xl">
                Add&nbsp;photo
              </button>
            </div>
            <div className=" grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
              <button className="flex items-center justify-center border bg-transparent rounded-2xl p-8 gap-1  text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=" w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                <span className="text-xs">Upload</span>
              </button>
            </div>
            <h2 className=" lg:text-xl mt-4">Description</h2>
            <p className=" text-gray-500 -mt-1 text-xs lgtext-sm">
              more info about the place
            </p>
            <textarea className=" w-full border h-36" />
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
