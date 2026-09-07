import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const DashboardStats = () => {
  const { backendUrl } = useContext(AppContext);
  const [dashboardJobs, setDashboardJobs] = useState([]);
  const [dashboardApplications, setDashboardApplications] = useState([]);

  // Logged-in recruiter ke jobs aur applications fetch karne ke liye
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = sessionStorage.getItem("companyToken")

        if (!token) return;

        const response = await fetch(`${backendUrl}/api/company/list-jobs`, {
          method: "GET",
          headers: {
            token: token,
          },
        });

        const data = await response.json();

        if (data.success) {
          setDashboardJobs(data.jobsData);
        }
      } catch (error) {
        console.log("Dashboard jobs fetch error:", error);
      }
    };

    fetchDashboardData();
  }, [backendUrl]);

  // Logged-in recruiter ki applications fetch karne ke liye
  useEffect(() => {
    const fetchDashboardApplications = async () => {
      try {
        const token = sessionStorage.getItem("companyToken")

        if (!token) return;

        const response = await fetch(`${backendUrl}/api/company/applicants`, {
          method: "GET",
          headers: {
            token: token,
          },
        });

        const data = await response.json();

        if (data.success) {
          setDashboardApplications(data.applications);
        }
      } catch (error) {
        console.log("Dashboard applications fetch error:", error);
      }
    };

    fetchDashboardApplications();
  }, [backendUrl]);

  // Recruiter dashboard ke liye jobs aur applications ke total statistics calculate karne ke liye
  const totalJobs = dashboardJobs.length;

  const activeJobs = dashboardJobs.filter((job) => job.visible === true).length;

  const totalApplications = dashboardApplications.length;

  const pendingApplications = dashboardApplications.filter(
    (application) => application.status === "Pending",
  ).length;
  return (
    <div className="p-5">
      {/* Recruiter ke main job aur application statistics ko cards ke form me show karne ke liye */}
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-5">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 text-sm">Total Jobs</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {totalJobs}
          </h3>
        </div>

        <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Active Jobs
          </p>
          <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            {activeJobs}
          </h3>
        </div>

        <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Total Applications
          </p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {totalApplications}
          </h3>
        </div>

        <div className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Pending Applications
          </p>
          <h3 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">
            {pendingApplications}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
