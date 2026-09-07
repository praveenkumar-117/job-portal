import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import moment from "moment";
import Footer from "../components/Footer";

const Applications = () => {
  // const [isEdit, setIsEdit] = useState(false);
  // const [resume, setResume] = useState(null);
  // Backend se milne wali real job applications ko store karne ke liye
  const [applications, setApplications] = useState([]);
  const { backendUrl, user } = useContext(AppContext);

  // Logged-in job seeker ki applications backend se fetch karne ke liye
  const fetchApplications = async () => {
    try {
      const response = await fetch(
        `${backendUrl}/api/applications/user-applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: sessionStorage.getItem("userToken"),
          },
        },
      );

      const data = await response.json();

      console.log("User applications response:", data);
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (error) {
      console.log("User applications fetch error:", error);
      toast.error("Unable to connect with server");
    }
  };

  // Applications page open hote hi logged-in user ki applications fetch karne ke liye
  useEffect(() => {
    if (user) {
      console.log("Logged-in user ID:", user._id);
      fetchApplications();
    }
  }, [user]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-gray-300 dark:bg-black">
        <div className="container px-4 2xl:px-20 mx-auto py-10">
          {/* Logged-in user ka uploaded resume open karne ke liye */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Your Resume
          </h2>

          <div className="flex gap-2 mb-6 mt-3">
            <a
              href={user?.resume || "#"}
              target={user?.resume ? "_blank" : undefined}
              rel={user?.resume ? "noopener noreferrer" : undefined}
              className={`px-4 py-2 rounded-lg transition ${
                user?.resume
                  ? "bg-green-400 hover:bg-green-500 text-black"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
            >
              {user?.resume ? "View Resume" : "Resume Not Uploaded"}
            </a>
          </div>

          {/* Job seeker ki applied jobs list show karne ke liye */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Jobs Applied
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-300 dark:bg-gray-800">
                  <th className="py-3 px-4 border-b border-gray-400 dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">
                    Company
                  </th>

                  <th className="py-3 px-4 border-b border-gray-400 dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">
                    Job Title
                  </th>

                  <th className="py-3 px-4 border-b border-gray-400 dark:border-gray-700 text-left max-sm:hidden text-gray-800 dark:text-gray-200">
                    Location
                  </th>

                  <th className="py-3 px-4 border-b border-gray-400 dark:border-gray-700 text-left max-sm:hidden text-gray-800 dark:text-gray-200">
                    Date
                  </th>

                  <th className="py-3 px-4 border-b border-gray-400 dark:border-gray-700 text-left text-gray-800 dark:text-gray-200">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {applications.map((application, index) => (
                  <tr
                    key={application._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <td className="py-3 px-4 flex items-center gap-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200">
                      <img
                        src={application.companyId?.image}
                        alt=""
                        className="w-8 h-8"
                      />
                      {application.companyId?.name}
                    </td>

                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200">
                      {application.jobId?.title}
                    </td>

                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 max-sm:hidden text-gray-700 dark:text-gray-300">
                      {application.jobId?.location}
                    </td>

                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 max-sm:hidden text-gray-700 dark:text-gray-300">
                      {moment(application.date).format("ll")}
                    </td>

                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                      <span
                        className={`
        ${
          application.status === "Accepted"
            ? "bg-green-100 text-green-700 border-green-400"
            : application.status === "Rejected"
              ? "bg-red-100 text-red-700 border-red-400"
              : "bg-yellow-100 text-yellow-700 border-yellow-400"
        }
        px-4 py-1.5 border rounded
      `}
                      >
                        {application.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Applications;
