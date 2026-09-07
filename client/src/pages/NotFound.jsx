import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-300 dark:bg-black flex items-center justify-center px-4">
      {/* Invalid URL ke liye professional 404 error page show karne ke liye */}
      <div className="text-center bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-sm p-10 max-w-lg w-full">
        <h1 className="text-7xl font-bold text-green-600 dark:text-green-400">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mt-3">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* User ko homepage par wapas le jane ke liye */}
        <Link
          to="/"
          className="inline-block mt-7 bg-green-400 hover:bg-green-500 text-black font-medium px-6 py-2.5 rounded-lg transition"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
