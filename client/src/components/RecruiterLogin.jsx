import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify"
import { IoClose } from "react-icons/io5";

const RecruiterLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTxtDataSubmited, setIsTxtDataSubmited] = useState(false);

  const { backendUrl, setShowRecruiterLogin, setCompany } =
    useContext(AppContext);

  const onSubmiteform = async (e) => {
    e.preventDefault();
    if (state == "Sign up" && !isTxtDataSubmited) {
      setIsTxtDataSubmited(true);
    }

    if (state == "Sign up" && isTxtDataSubmited) {
      if (!image) {
        toast.info("Please upload company logo");
        return;
      }

      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image);

      console.log("Backend URL:", backendUrl);
      try {
        const response = await fetch(`${backendUrl}/api/company/register`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        console.log("Signup response:", data);

        if (data.success) {
         sessionStorage.setItem("companyToken", data.token);

          setCompany(data.company);

          toast.success("Company account created successfully");

          setShowRecruiterLogin(false);

          navigate("/dashboard");
        }
      } catch (error) {
        console.log("Signup error:", error);
        toast.error("Unable to connect with server");
      }
    }

if (state == "Login") {

  try {

    const response = await fetch(
      `${backendUrl}/api/company/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    )

    const data = await response.json()

    console.log("Login response:", data)

    if (data.success) {

      sessionStorage.setItem("companyToken", data.token)

      setCompany(data.company)

      setShowRecruiterLogin(false)

      navigate("/dashboard")

    } else {

      toast.error(data.message)

    }

  } catch (error) {

    console.log("Login error:", error)
    toast.error("Unable to connect with server")

  }

}


  };
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return (
   <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">

  {/* Recruiter login/signup form ko theme ke according display karne ke liye */}
  <form
    onSubmit={onSubmiteform}
    className="relative bg-gray-200 dark:bg-gray-900 p-10 rounded-xl text-gray-600 dark:text-gray-300"
  >

    <h1 className="text-center text-2xl text-gray-900 dark:text-white font-medium">
      Recruiter {state}
    </h1>

    <p className="text-sm text-gray-600 dark:text-gray-400">
      Welcome back! Please sign in to continue
    </p>

    {state === "Sign up" && isTxtDataSubmited ? (
      <>
        <div className="flex items-center gap-4 my-10">
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-16 rounded-full"
            />

            <input
              type="file"
              id="image"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>

          <p className="text-gray-700 dark:text-gray-300">
            Upload Company
            <br />
            logo
          </p>
        </div>
      </>
    ) : (
      <>
        {state !== "Login" && (
          <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 flex items-center gap-2 rounded-full mt-5">

            <img src={assets.person_icon} alt="" />

            <input
              className="outline-none text-sm bg-transparent text-gray-800 dark:text-gray-200 w-full"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Company Name"
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
      </>
    )}

    {state === "Login" ? (
      <p className="text-sm text-green-600 dark:text-green-400 my-4 cursor-pointer">
        forget password
      </p>
    ) : (
      <div className="py-4"></div>
    )}

    <button
      type="submit"
      className="bg-green-400 hover:bg-green-500 text-black w-full px-4 py-2 rounded-full font-medium transition"
    >
      {state === "Login"
        ? "login"
        : isTxtDataSubmited
          ? "Create Account"
          : "Next"}
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
      onClick={(e) => setShowRecruiterLogin(false)}
      className="absolute top-5 right-5 cursor-pointer hover:text-white hover:bg-red-500 rounded-lg p-1 transition"
    >
      <IoClose />
    </span>

  </form>
</div>
  );
};

export default RecruiterLogin;
