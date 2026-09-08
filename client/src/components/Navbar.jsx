import { useContext } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const {
    setShowRecruiterLogin,
    showUserLogin,
    setShowUserLogin,
    user,
    company,
    setUser,
    isDarkMode,
    setIsDarkMode,
  } = useContext(AppContext);

  // Recruiter ke logged-in session ko identify karne ke liye
  const companyToken = sessionStorage.getItem("companyToken");

  return (
    <div className="bg-gray-900 dark:bg-black border-b border-gray-200 dark:border-gray-800 py-4">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center ">
        <img
          onClick={() => navigate("/")}
          className="hidden sm:block cursor-pointer bg-gray-200 px-2 py-1 rounded-md"
          src={assets.logo}
          alt=""
        />
  <button
    onClick={() => navigate("/")}
    className="sm:hidden text-white text-xl p-2 rounded-md hover:bg-gray-800 transition"
    title="Home"
  >
    🏠 
  </button>
  <p className="sm:hidden text-white">Welcome..</p>
        {user ? (
          // Job seeker ke logged-in hone par uski navigation show karne ke liye
          <div className="w-full sm:w-auto justify-evenly sm:justify-normal flex items-center gap-3 font-semibold">
            <Link
              to="/applications"
              className="text-white dark:text-gray-200 hover:text-green-300 transition"
            >
              Applied Jobs
            </Link>

            <p className="text-gray-200 dark:text-gray-600 font-bold">|</p>

            {/* Job seeker ko profile page par le jaane ke liye */}
            <Link
              to="/profile"
              className="text-white dark:text-gray-200 hover:text-green-300 transition"
            >
              Profile
            </Link>

            <p className="text-white dark:text-gray-600 font-bold">|</p>

            <p className="max-sm:hidden text-white dark:text-gray-200">
              Hi, {user.name}
            </p>

            <button
              onClick={() => {
                // Logout se pehle user se confirmation lene ke liye
                const confirmLogout = window.confirm(
                  "Are you sure you want to logout?",
                );

                if (!confirmLogout) return;

                sessionStorage.removeItem("userToken");
                sessionStorage.removeItem("userData");
                setUser(null);
                navigate("/");

                // Successful logout ke baad user ko notification dikhane ke liye
                toast.success("Logged out successfully");
              }}
              className="text-red-500 hover:bg-red-500 hover:text-white py-1 px-2 rounded-md transition"
            >
              Logout
            </button>
          </div>
        ) : companyToken ? (
          // Recruiter ke logged-in hone par Dashboard aur Logout show karne ke liye
          <div className="flex items-center gap-3 font-semibold">
            <p className="max-sm:hidden text-white dark:text-gray-200">
              Hi, {company?.name}
            </p>
            <p className="text-gray-200 dark:text-gray-600 font-bold">|</p>
            <Link
              to="/dashboard"
              className="text-white dark:text-gray-200 hover:text-green-300 transition"
            >
              Dashboard
            </Link>

            <p className="text-gray-200 dark:text-gray-600 font-bold">|</p>

            <button
              onClick={() => {
                // Recruiter logout se pehle confirmation lene ke liye
                const confirmLogout = window.confirm(
                  "Are you sure you want to logout?",
                );

                if (!confirmLogout) return;

                sessionStorage.removeItem("companyToken");

                // Successful logout ke baad home page par redirect karne ke liye
                toast.success("Logged out successfully");
                navigate("/");
              }}
              className="text-red-500 hover:bg-red-500 hover:text-white py-1 px-2 rounded-md transition"
            >
              Logout
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 transition"
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>
        ) : (
          // Kisi bhi account ke login na hone par login options show karne ke liye
      <div className="w-full sm:w-auto flex items-center justify-between sm:justify-normal gap-2 sm:gap-4 font-semibold ">
            <button
              onClick={() => setShowRecruiterLogin(true)}
              className="text-gray-300 hover:text-green-400 border border-transparent hover:border hover:border-green-400 px-6 sm:px-6 py-1.5 rounded-full transition"
            >
              Recruiter Login
            </button>

            <button
              onClick={() => setShowUserLogin(true)}
              className="bg-green-400 hover:bg-transparent hover:text-green-400 border border-transparent hover:border hover:border-green-400 text-black px-6 sm:px-9 py-1.5 rounded-full transition"
            >
              Login
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-full bg-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 transition"
              title={
                isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
              }
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
