import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Footer from "../components/Footer";

import { toast } from "react-toastify";

const DashBoard = () => {
  const navigate = useNavigate();
  const { company, jobs } = useContext(AppContext);

  console.log("Recruiter dashboard jobs:", jobs);
  return (
    <div className="min-h-screen bg-gray-300 dark:bg-black">
      {/* Recruiter panel ki top navigation ko theme ke according show karne ke liye */}
      <div className="shadow py-4 bg-gray-900 dark:bg-black text-gray-200">
        <div className="px-5 flex justify-between items-center ">
          <img
            onClick={(e) => navigate("/")}
            src={assets.logo}
            alt=""
            className="hidden sm:block max-sm:w-32 cursor-pointer bg-white rounded-md p-1"
          />

          <div className="w-full sm:w-auto flex items-center justify-evenly gap-6 px-2 ">
            <p className="flex gap-3 text-sm sm:text-base truncate max-w-[280px]">
              Welcome,{" "}
              <span className="uppercase text-green-400">{company?.name}</span>
            </p>

            <div className="relative group">
              <img
                src={company?.image || assets.company_icon}
                alt=""
                className="w-8 border border-gray-500 rounded-full"
              />

              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-gray-800 rounded pt-12">
                <ul className="list-none m-0 p-2 bg-gray-200 dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 text-sm">
                  <li
                    onClick={() => {
                      // Recruiter logout se pehle confirmation lene ke liye
                      const confirmLogout = window.confirm(
                        "Are you sure you want to logout?",
                      );

                      if (!confirmLogout) return;

                      sessionStorage.removeItem("companyToken");
                      navigate("/");

                      // Successful recruiter logout ke baad confirmation notification dikhane ke liye
                      toast.success("Logged out successfully");
                    }}
                    className="py-1 px-2 cursor-pointer pr-10 rounded-md text-center hover:bg-green-400 hover:text-black transition"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start">
        {/* Recruiter dashboard ke navigation options show karne ke liye */}
        <div className="border-r border-gray-400 dark:border-gray-700 bg-gray-200 dark:bg-gray-900 inline-block min-h-screen shrink-0">
          <ul className="flex flex-col items-start pt-5 text-gray-800 dark:text-gray-200">
            <NavLink
              to={"/dashboard/add-job"}
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full
            hover:bg-green-100 dark:hover:bg-green-900/30
            transition
            ${
              isActive
                ? "bg-green-400 text-black border-r-4 border-green-600"
                : ""
            }`
              }
            >
              <img src={assets.add_icon} alt="" className="min-w-4" />
              <p className="max-sm:hidden">Add Job</p>
            </NavLink>

            <NavLink
              to={"/dashboard/manage-job"}
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full
            hover:bg-green-100 dark:hover:bg-green-900/30
            transition
            ${
              isActive
                ? "bg-green-400 text-black border-r-4 border-green-600"
                : ""
            }`
              }
            >
              <img src={assets.home_icon} alt="" className="min-w-4" />
              <p className="max-sm:hidden">Manage Jobs</p>
            </NavLink>

            <NavLink
              to={"/dashboard/view-applications"}
              className={({ isActive }) =>
                `flex items-center p-3 sm:px-6 gap-2 w-full
            hover:bg-green-100 dark:hover:bg-green-900/30
            transition
            ${
              isActive
                ? "bg-green-400 text-black border-r-4 border-green-600"
                : ""
            }`
              }
            >
              <img src={assets.person_tick_icon} alt="" className="min-w-4" />
              <p className="max-sm:hidden">View Applications</p>
            </NavLink>
          </ul>
        </div>

        {/* Dashboard ke remaining area me selected page render karne ke liye */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoard;
