import React, { useContext, useEffect, useState } from "react";
// import { manageJobsData } from '../assets/assets'
import { AppContext } from "../context/AppContext";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

const ManageJob = () => {
  const navigate = useNavigate();
 
  const { backendUrl } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);

  const fetchCompanyJobs = async () => {
    const token = sessionStorage.getItem("companyToken");

    try {
      const response = await fetch(`${backendUrl}/api/company/list-jobs`, {
        method: "GET",
        headers: {
          token: token,
        },
      });

      const data = await response.json();

      console.log("Company jobs:", data);

      if (data.success) {
        setJobs(data.jobsData);
      }
    } catch (error) {
      console.log("Error fetching company jobs:", error);
    }
  };

  const changeJobVisibility = async (id) => {
    const token = sessionStorage.getItem("companyToken");

    try {
      const response = await fetch(
        `${backendUrl}/api/company/change-visiblity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({ id }),
        },
      );

      const data = await response.json();

      console.log("Visibility response:", data);

      if (data.success) {
        setJobs((prevJobs) =>
          prevJobs.map((job) => (job._id === id ? data.job1 : job)),
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Visibility error:", error);
    }
  };

  // Company ki job ko backend API ke through delete karne ke liye
  const deleteJob = async (id) => {
    const token = sessionStorage.getItem("companyToken");

    try {
      const response = await fetch(`${backendUrl}/api/company/delete-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      console.log("Delete job response:", data);

      if (data.success) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Delete job error:", error);
    }
  };

  useEffect(() => {
    fetchCompanyJobs();
  }, []);
  return (
    <div className="container p-4 max-auto">
  <div className="overflow-x-auto">
    <table className="min-w-[900px] lg:min-w-full bg-gray-200 dark:bg-gray-900 border border-gray-400 dark:border-gray-700 max-sm:text-sm">
      
      {/* Job management table ke header ko theme ke according style karne ke liye */}
      <thead className="bg-gray-800 dark:bg-black text-white">
        <tr>
          <th className="py-4 px-8 border-b text-left max-sm:hidden">
            #
          </th>

          <th className="py-4 px-8 border-b text-left">
            Job Title
          </th>

          <th className="py-4 px-8 border-b text-left max-sm:hidden">
            Date
          </th>

          <th className="py-4 px-8 border-b text-left max-sm:hidden">
            Location
          </th>

          <th className="py-4 px-8 border-b text-center">
            Application
          </th>

          <th className="py-4 px-8 border-b text-left">
            Visible
          </th>

          <th className="py-4 px-8 border-b text-left">
            Action
          </th>
        </tr>
      </thead>

      <tbody className="bg-gray-200 dark:bg-gray-900">
        {jobs.map((job, index) => (
          <tr
            key={index}
            className="text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-800 transition"
          >
            <td className="py-4 px-8 border-b max-sm:hidden">
              {index + 1}
            </td>

            <td className="py-4 px-8 border-b">
              {job.title}
            </td>

            <td className="py-4 px-8 border-b max-sm:hidden">
              {moment(job.date).format("ll")}
            </td>

            <td className="py-4 px-8 border-b max-sm:hidden">
              {job.location}
            </td>

            <td className="py-4 px-8 border-b text-center">
              {job.applicants}
            </td>

            <td className="py-4 px-8 border-b">
              <input
                type="checkbox"
                className="scale-125 ml-4 accent-green-500"
                checked={job.visible}
                onChange={() => changeJobVisibility(job._id)}
              />
            </td>

            <td className="py-4 px-8 flex gap-2">
              <button
                title="Edit Job"
                className="text-green-600 hover:bg-green-600 hover:text-white p-1.5 rounded-lg transition"
                onClick={() =>
                  navigate(`/dashboard/add-job?id=${job._id}`)
                }
              >
                <BiEdit size={20} />
              </button>

              <button
  title="Delete Job"
  className="text-red-600 hover:bg-red-600 hover:text-white p-1.5 rounded-lg transition"
  onClick={() => {
    // Job delete karne se pehle recruiter se confirmation lene ke liye
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    deleteJob(job._id);
  }}
>
  <RiDeleteBin6Line size={20} />
</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="mt-4 flex justify-end">
    <button
      onClick={() => navigate("/dashboard/add-job")}
      className="bg-green-400 hover:bg-green-500 text-black py-2 px-4 rounded transition"
    >
      Add New Job
    </button>
  </div>
</div>
  );
};

export default ManageJob;
