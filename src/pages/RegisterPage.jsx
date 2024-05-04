import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axios.post(
        "https://booking-be-11qh.onrender.com/api/v1/user/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success("Registration successful");
      console.log(res.data);
      setRedirect(true);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      toast.error(message);
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className=" mt-4 grow flex items-center justify-center">
      <div className="  mb-64">
        <h1 className=" text-2xl lg:text-4xl text-center  mb-4">Register</h1>
        <form className=" lg:max-w-md mx-auto " onSubmit={handleSubmit}>
          <input
            className=" placeholder:font-normal"
            type="text"
            placeholder="John Doe "
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            className=" placeholder:font-normal"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            className=" placeholder:font-normal"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary mt-4 " type="submit">
            Register
          </button>
          <div className=" text-sm  text-center text-clip py-2 text-gray-500">
            Already have an account yet?{" "}
            <Link className="  text-center underline text-black" to={"/login"}>
              login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
