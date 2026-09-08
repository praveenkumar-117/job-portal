import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify"
import { FaUser } from "react-icons/fa";

const ViewApplications = () => {
  const { backendUrl } = useContext(AppContext);
  const [applications, setApplications] = useState([]);

  // Recruiter ki company ke sabhi job applications backend se fetch karne ke liye
  const fetchApplications = async () => {
    const token = sessionStorage.getItem("companyToken");

    try {
      const response = await fetch(`${backendUrl}/api/company/applicants`, {
        method: "GET",
        headers: {
          token: token,
        },
      });

      const data = await response.json();

      console.log("Applications response:", data);

      if (data.success) {
        setApplications(data.applications);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Applications fetch error:", error);
    }
  };


  // Recruiter ke Accept/Reject action ko backend API ke through update karne ke liye
const changeApplicationStatus = async (applicationId, status) => {
  const token = sessionStorage.getItem("companyToken")

  try {
    const response = await fetch(
      `${backendUrl}/api/company/change-status`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token
        },
        body: JSON.stringify({
          id: applicationId,
          status: status
        })
      }
    )

    const data = await response.json()

    console.log("Application status response:", data)

    if (data.success) {
     // Status update ke baad populated applicant/job data dobara fetch karne ke liye
  fetchApplications()

    } else {
      toast.error(data.message)
    }

  } catch (error) {
    console.log("Application status error:", error)
    toast.error("Unable to connect with servertoast.error")
}
}

  // View Applications page open hote hi applications fetch karne ke liye
  useEffect(() => {
    fetchApplications();
  }, []);
  return (
    <div className="container mx-auto p-4">
  <div className="bg-gray-200 dark:bg-gray-900 border border-gray-400 dark:border-gray-700 rounded-lg overflow-x-auto">
  <table className="min-w-[900px] lg:min-w-full bg-gray-200 dark:bg-gray-900 max-sm:text-sm">

      {/* Applicants table ke header ko project ke common theme ke according style karne ke liye */}
      <thead className="bg-gray-800 dark:bg-black text-white">
        <tr className="border-b border-gray-600">
          <th className="py-4 px-8 text-left">#</th>
          <th className="py-4 px-8 text-left">User name</th>
          <th className="py-4 px-8 text-left max-sm:hidden">
            Job Title
          </th>
          <th className="py-4 px-8 text-left max-sm:hidden">
            Location
          </th>
          <th className="py-4 px-8 text-left">
            Resume
          </th>
          <th className="py-4 px-8 text-left">
            Action
          </th>
        </tr>
      </thead>

      <tbody className="bg-gray-200 dark:bg-gray-900">
        {applications.map((applicant, index) => (
          <tr
            key={index}
            className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 transition"
          >
            <td className="py-4 px-8 border-b border-gray-300 dark:border-gray-700 text-center">
              {index + 1}
            </td>

            <td className="py-4 px-8 border-b border-gray-300 dark:border-gray-700 text-center flex items-center">
              <span
                src={applicant.userId?.image || assets.person_icon}
                alt=""
                className="w-10 h-10 rounded-full mr-2 max-sm:hidden flex items-center justify-center bg-gray-300 dark:bg-gray-800"
              >
                <FaUser />
              </span>

              <span className="whitespace-nowrap text-ellipsis">
                {applicant.userId?.name}
              </span>
            </td>

            <td className="py-4 px-8 border-b border-gray-300 dark:border-gray-700 max-sm:hidden">
              {applicant.jobId?.title}
            </td>

            <td className="py-4 px-8 border-b border-gray-300 dark:border-gray-700 max-sm:hidden">
              {applicant.jobId?.location}
            </td>

            <td className="py-4 px-8 border-b border-gray-300 dark:border-gray-700 bg-transparent">
              <a
                href={applicant.userId?.resume || "#"}
                target="_blank"
                className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700 px-3 py-1 rounded inline-flex gap-2 items-center hover:bg-green-200 dark:hover:bg-green-900/50 transition"
              >
                Resume
                <img src={assets.resume_download_icon} />
              </a>
            </td>

            <td className="py-4 px-8 border-b border-gray-300 dark:border-gray-700">
              {applicant.status === "Accepted" ? (

                // Application accept ho chuki hai to Accepted status show karne ke liye
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  Accepted
                </span>

              ) : applicant.status === "Rejected" ? (

                // Application reject ho chuki hai to Rejected status show karne ke liye
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  Rejected
                </span>

              ) : (

                <div className="flex items-center gap-3">

                  {/* Pending application ko accept karne ke liye */}
                  <button
                    title="Accept Application"
                    onClick={() =>
                      changeApplicationStatus(
                        applicant._id,
                        "Accepted"
                      )
                    }
                    className="hover:scale-110 transition"
                  >
                    <img
                      src="/accept.png"
                      alt="Accept"
                      className="w-8 h-8"
                    />
                  </button>

                  {/* Pending application ko reject karne ke liye */}
                  <button
                    title="Reject Application"
                    onClick={() =>
                      changeApplicationStatus(
                        applicant._id,
                        "Rejected"
                      )
                    }
                    className="hover:scale-110 transition"
                  >
                    <img
                      src="/reject.png"
                      alt="Reject"
                      className="w-8 h-8"
                    />
                  </button>

                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default ViewApplications;
