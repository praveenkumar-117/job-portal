import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const UserLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setUser, setShowUserLogin } = useContext(AppContext);
  const navigate = useNavigate();

  // Job seeker ke register/login form ko backend API se connect karne ke liye
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        state === "Login" ? "/api/user/login" : "/api/user/register";

      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          state === "Login" ? { email, password } : { name, email, password },
        ),
      });

      const data = await response.json();

      console.log("User auth response:", data);

      if (data.success) {
        sessionStorage.setItem("userData", JSON.stringify(data.user));
        sessionStorage.setItem("userToken", data.token);

        setUser(data.user);
        // Login ya signup successful hone ke baad popup close karne ke liye
        setShowUserLogin(false);
        toast.success(
          state === "Login"
            ? "Login successful"
            : "Account created successfully",
        );
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("User auth error:", error);
      toast.error("Unable to connect with server");
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      {/* Job seeker login/signup form ko project ki green theme ke according show karne ke liye */}
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-gray-200 dark:bg-gray-900 p-10 rounded-xl text-gray-600 dark:text-gray-300"
      >
        <h1 className="text-center text-2xl text-gray-900 dark:text-white font-medium">
          Job Seeker {state}
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {state === "Login"
            ? "Welcome back! Please login to continue"
            : "Create your account to find your dream job"}
        </p>

        {state === "Sign up" && (
          <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.person_icon} alt="" />

            <input
              className="outline-none text-sm bg-transparent text-gray-800 dark:text-gray-200 w-full"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="" />

          <input
            className="outline-none text-sm bg-transparent text-gray-800 dark:text-gray-200 w-full"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email Id"
            required
          />
        </div>

        <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="" />

          <input
            className="outline-none text-sm bg-transparent text-gray-800 dark:text-gray-200 w-full"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {state === "Login" && (
          <p className="text-sm text-green-600 dark:text-green-400 my-4 cursor-pointer">
            Forgot password
          </p>
        )}

        <button
          type="submit"
          className="bg-green-400 hover:bg-green-500 text-black w-full mt-5 px-4 py-2 rounded-full font-medium transition"
        >
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center text-gray-700 dark:text-gray-300">
            Don't have an account?{" "}
            <span
              className="text-green-600 dark:text-green-400 cursor-pointer font-medium"
              onClick={() => setState("Sign up")}
            >
              Signup
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-gray-700 dark:text-gray-300">
            Already have an account?{" "}
            <span
              className="text-green-600 dark:text-green-400 cursor-pointer font-medium"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <span
          onClick={() => setShowUserLogin(false)}
          className="absolute top-5 right-5 cursor-pointer hover:text-white hover:bg-red-500 rounded-lg p-1 transition"
        >
          <IoClose />
        </span>
      </form>
    </div>
  );
};

export default UserLogin;
