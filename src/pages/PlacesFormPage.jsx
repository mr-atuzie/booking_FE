import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import AccountNav from "../components/AccountNav";

// const cloud_name = process.env.REACT_APP_CLOUD_NAME;
// const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
// const url = process.env.REACT_APP_CLOUD_URL;

const PlacesFormPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  // const [photoLink, setPhotoLink] = useState("");
  const [price, setPrice] = useState(100);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios
      .get("/api/v1/places/" + id)
      .then(({ data }) => {
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
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

  const inputHeader = (text) => {
    return <h2 className=" lg:text-xl font-medium mt-4">{text}</h2>;
  };

  const inputDesc = (desc) => {
    return <p className=" text-gray-500 -mt-1 text-xs lgtext-sm ">{desc}</p>;
  };

  const assembleInput = (header, desc) => {
    return (
      <>
        {inputHeader(header)}
        {inputDesc(desc)}
      </>
    );
  };

  // async function addPhotoByLink(ev) {
  //   ev.preventDefault();
  //   try {
  //     const { data: filename } = await axios.post("/upload-by-link", {
  //       link: photoLink,
  //     });

  //     console.log(filename);

  //     setAddedPhotos((prev) => {
  //       return [...prev, filename];
  //     });
  //     setPhotoLink("");
  //   } catch (error) {
  //     const message =
  //       (error.response &&
  //         error.response.data &&
  //         error.response.data.message) ||
  //       error.message ||
  //       error.toString();

  //     toast.error(message);
  //     console.log(error);
  //   }
  // }

  async function uploadPhoto(ev) {
    ev.preventDefault();

    let uploadFiles = [];

    console.log("started");

    try {
      const files = ev.target.files;
      const dataDoc = new FormData();

      for (let i = 0; i < files.length; i++) {
        dataDoc.append("file", files[i]);
        dataDoc.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
        dataDoc.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

        const res = await fetch(process.env.REACT_APP_CLOUD_URL, {
          method: "post",
          body: dataDoc,
        });
        const imageData = await res.json();

        uploadFiles.push(imageData.secure_url.toString());
      }

      setAddedPhotos((prev) => {
        return [...prev, ...uploadFiles];
      });
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();

      console.log(error);
      // toast.error(message);
    }
  }

  async function savePlace(ev) {
    ev.preventDefault();

    if (id) {
      try {
        const { data } = await axios.put("/api/v1/places/", {
          id,
          title,
          address,
          price,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
        });

        toast.success("Place updated successfully");
        console.log(data);
        setRedirect("/account/places");
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(error);
        toast.error(message);
      }
    } else {
      try {
        const { data } = await axios.post("/api/v1/places/", {
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });

        toast.success("Place added successfully");
        console.log(data);
        setRedirect("/account/places");
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(error);
        toast.error(message);
      }
    }
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  }

  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    const filterFilename = addedPhotos.filter((photo) => photo !== filename);

    const newAddedPhotos = [filename, ...filterFilename];

    setAddedPhotos(newAddedPhotos);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {assembleInput("Title", "title should be short and catchy")}
        <input
          className=" text-sm placeholder:text-sm placeholder:font-light"
          type="text"
          placeholder=" for example: 2 bed room duplex"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />

        {assembleInput("Address", " address to this place")}
        <input
          className=" text-sm placeholder:text-sm placeholder:font-light"
          type="text"
          placeholder="address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
        />

        {assembleInput("Photos", " more is better")}
        {/* <div className=" flex gap-2">
          <input
            className=" text-sm placeholder:text-sm placeholder:font-light"
            type="text"
            placeholder="Add using a link...jpg"
            value={photoLink}
            onChange={(ev) => setPhotoLink(ev.target.value)}
          />
          <button
            onClick={addPhotoByLink}
            className=" bg-gray-200 text-xs lg:text-base px-2 lg:px-4 rounded-2xl"
          >
            Add&nbsp;photo
          </button>
        </div> */}

        <div className=" grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-2">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link, index) => {
              return (
                <div className=" h-32 flex relative " key={index}>
                  <img
                    className=" w-full  object-cover rounded-2xl"
                    src={link}
                    alt=""
                  />
                  <button
                    onClick={(ev) => removePhoto(ev, link)}
                    className=" absolute bottom-1 right-1 bg-black py-2 px-2 lg:px-3 cursor-pointer bg-opacity-50 text-white rounded-2xl"
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={(ev) => selectAsMainPhoto(ev, link)}
                    className=" absolute bottom-1 left-1 bg-black py-2 px-2 lg:px-3 cursor-pointer bg-opacity-50 text-white rounded-2xl"
                  >
                    {link === addedPhotos[0] && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className=" w-4 lg:w-6 h-4 lg:h-6 text-yellow-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {link !== addedPhotos[0] && (
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
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              );
            })}
          <label className="flex h-32 cursor-pointer items-center justify-center border bg-transparent rounded-2xl p-2 gap-1  text-gray-600">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
            <span>
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
            </span>
            <span className="text-xs">Upload</span>
          </label>
        </div>

        {assembleInput("Description", "more detail about the place")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          className=" w-full border h-36 text-sm"
        />

        {assembleInput("Perks", "select all the perks of the place")}
        <Perks selected={perks} onChange={setPerks} />

        {assembleInput("Extra Info", "house rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          className=" w-full border text-sm"
        />

        {assembleInput(
          "Check In & out time",
          "add check in and out times , remember to have some windwo for cleaning the room between guests"
        )}
        <div className=" grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className=" mt-2 -mb-1 text-xs lg:text-base">Check in time</h3>
            <input
              className=" text-sm placeholder:text-sm placeholder:font-light"
              placeholder="14"
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
            />
          </div>
          <div>
            <h3 className=" mt-2 -mb-1 text-xs lg:text-base">Check out time</h3>
            <input
              className=" text-sm placeholder:text-sm placeholder:font-light"
              placeholder="16"
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
            />
          </div>
          <div>
            <h3 className=" mt-2 -mb-1 text-xs lg:text-base">
              Max number of quests
            </h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
          <div>
            <h3 className=" mt-2 -mb-1 text-xs lg:text-base">
              Price per night
            </h3>
            <input
              type="number"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="primary my-4">
          Save
        </button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
