import React, { useContext, useRef, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearch } = useContext(AppContext);
  const titleRef = useRef(null);
  const loactionRef = useRef(null);

  const [heroImage, setHeroImage] = useState("boy");

  // Har page load par hero image ko boy/girl me alternate karne aur next choice save karne ke liye
  useEffect(() => {
    const lastImage = localStorage.getItem("heroImage");

    const nextImage = lastImage === "boy" ? "girl" : "boy";

    setHeroImage(nextImage);
    localStorage.setItem("heroImage", nextImage);
  }, []);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: loactionRef.current.value,
    });

    setIsSearch(true);

    titleRef.current.value = "";
    loactionRef.current.value = "";
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10">
     
{/* Hero section me image aur job search content ko responsive layout me show karne ke liye */}
<div
  className={`bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white mx-2 rounded-2xl shadow-sm overflow-hidden ${
    heroImage === "boy"
      ? "flex flex-col md:flex-row-reverse"
      : "flex flex-col md:flex-row"
  }`}
>
  {/* Selected person image ko hero content ke opposite side me show karne ke liye */}
  <div className="w-full md:w-1/2 flex justify-center items-end">
    <img
      src={heroImage === "boy" ? "/hero_boy.png" : "/hero_girl.png"}
      alt="Career opportunity"
      className="w-full max-w-md h-auto object-contain"
    />
  </div>

  <div className="w-full md:w-1/2 flex flex-col justify-center items-center py-12 md:py-16 px-6 md:px-10">
  
    <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-center">
      Find Your{" "}
      <span className="text-green-600 dark:text-green-400 font-bold">
        Dream Job
      </span>
    </h2>

    <p className="mb-8 max-w-xl mx-auto text-sm font-normal px-5 text-center text-gray-600 dark:text-gray-400">
      Your Next Big Career Move Starts Right Here — Explore The Best Job
      Opportunities And Take The First Step Toward Your Future!
    </p>

    {/* Job title aur location ke basis par search karne ke liye */}
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-white dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-200 w-full max-w-2xl mx-4 p-1.5 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center flex-1 px-3">
        <img className="h-4 sm:h-5" src={assets.search_icon} alt="" />

        <input
          type="text"
          placeholder="Search For Jobs"
          className="max-sm:text-sm p-2.5 rounded outline-none w-full bg-transparent dark:text-white"
          ref={titleRef}
        />
      </div>

      <div className="hidden sm:block w-px h-7 bg-gray-300 dark:bg-gray-700"></div>

      <div className="flex items-center flex-1 px-3">
        <img className="h-4 sm:h-5" src={assets.location_icon} alt="" />

        <input
          type="text"
          placeholder="Location"
          className="max-sm:text-sm p-2.5 rounded outline-none w-full bg-transparent dark:text-white"
          ref={loactionRef}
        />
      </div>

      <button
        className="bg-green-400 hover:bg-green-500 text-black text-sm font-medium px-8 py-2.5 rounded-lg m-1 transition"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  </div>
</div>
      {/* Trusted companies ko clean gray section me show karne ke liye */}
      <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-sm mx-2 mt-5 p-6 rounded-xl">
        <div className="flex items-center justify-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            Trusted By
          </p>

          <img
            className="h-6 hover:scale-110 transition-transform duration-300"
            src={assets.accenture_logo}
            alt=""
          />

          <img
            className="h-6 hover:scale-110 transition-transform duration-300"
            src={assets.adobe_logo}
            alt=""
          />

          <img
            className="h-6 hover:scale-110 transition-transform duration-300"
            src={assets.walmart_logo}
            alt=""
          />

          <img
            className="h-6 hover:scale-110 transition-transform duration-300"
            src={assets.samsung_logo}
            alt=""
          />

          <img
            className="h-6 hover:scale-110 transition-transform duration-300"
            src={assets.microsoft_logo}
            alt=""
          />

          <img
            className="h-6 hover:scale-110 transition-transform duration-300"
            src={assets.amazon_logo}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
