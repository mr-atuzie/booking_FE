import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { API_URL } from "../App";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post(API_URL + "login", {
        email,
        password,
      });

      setUser(data);
      toast.success("Login successful");
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
        <h1 className=" text-2xl lg:text-4xl text-center mb-4">Login</h1>
        <form className=" lg:max-w-md mx-auto " onSubmit={handleSubmit}>
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
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary mt-4" type="submit">
            Login
          </button>
          <div className=" text-sm text-center text-clip py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link
              className="  text-center underline text-black"
              to={"/register"}
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
