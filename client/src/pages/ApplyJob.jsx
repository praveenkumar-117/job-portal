import { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";

const ApplyJob = () => {
  const { id } = useParams();
  const { jobs, backendUrl, user } = useContext(AppContext);
  const [jobData, setJobData] = useState(null);
  const [isApplied, setIsApplied] = useState(false);

  const fetchJob = async () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) setJobData(data[0]);
    console.log(data[0]);
  };

  // Logged-in job seeker ki current job application backend me save karne ke liye
  const applyJob = async () => {
    if (!user) {
      toast.error("Please login to apply for this job");
      return;
    }

    if (!jobData) {
      toast.error("Job data not available");
      return;
    }

    try {
      console.log("Applying user:", user._id);
      console.log("Applying job:", jobData._id);

      const response = await fetch(`${backendUrl}/api/applications/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("userToken"),
        },
        body: JSON.stringify({
          jobId: jobData._id,
          companyId: jobData.companyId._id,
        }),
      });

      const data = await response.json();

      console.log("Apply Job response:", data);

      if (data.success) {
        toast.success("Job applied successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Apply Job error:", error);
      toast.error("Unable to connect with server");
    }
  };

  // Logged-in user ki applications fetch karke current job ka application status check karne ke liye
  const checkApplicationStatus = async () => {
    if (!user) {
      setIsApplied(false);
      return;
    }

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

      if (data.success) {
        const alreadyApplied = data.applications.some(
          (application) => application.jobId?._id === id,
        );

        setIsApplied(alreadyApplied);
      }
    } catch (error) {
      console.log("Application status check error:", error);
    }
  };

  useEffect(() => {
    if (jobs.length > 0) {
      fetchJob();
    }
    checkApplicationStatus();
  }, [id, jobs, user]);

  return jobData ? (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-300 dark:bg-black flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="text-gray-900 dark:text-white rounded-lg w-full">
          {/* Job ki basic information aur apply action show karne ke liye */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-8 md:px-14 py-16 bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl">
            <div className="flex flex-col md:flex-row items-center">
              <img
                className="h-24 w-24 object-contain bg-white rounded-lg p-4 mr-4 border border-gray-200"
                src={jobData.companyId.image}
                alt=""
              />

              <div className="text-center md:text-left text-gray-800 dark:text-gray-200">
                <h1 className="text-2xl sm:text-4xl font-medium text-gray-900 dark:text-white">
                  {jobData.title}
                </h1>

                <div className="flex flex-row flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 dark:text-gray-400 mt-2">
                  <span className="flex items-center gap-1">
                    <img src={assets.suitcase_icon} alt="" />
                    {jobData.companyId.name}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.location_icon} alt="" />
                    {jobData.location}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.person_icon} alt="" />
                    {jobData.level}
                  </span>

                  <span className="flex items-center gap-1">
                    <img src={assets.money_icon} alt="" />
                    CTC : {kconvert.convertTo(jobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center text-end text-sm max-md:text-center">
              {/* Current job ke application status ke according Apply button ko update karne ke liye */}
              <button
                className={`font-medium p-2.5 px-10 rounded transition ${
                  isApplied
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-green-400 hover:bg-green-500 text-black"
                }`}
                onClick={applyJob}
                disabled={isApplied}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </button>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Posted : {moment(jobData.date).fromNow()}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4 mt-8 text-gray-900 dark:text-white">
                Job Description
              </h2>

              <div
                className="rich-text text-gray-800 dark:text-gray-300 [&_h1]:text-gray-900 [&_h1]:dark:text-white [&_h2]:text-gray-900 [&_h2]:dark:text-white [&_h3]:text-gray-900 [&_h3]:dark:text-white"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              ></div>

              {/* Current job ke application status ke according Apply button ko update karne ke liye */}
              <button
                className={`font-medium p-2.5 px-10 mt-10 rounded transition ${
                  isApplied
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-green-400 hover:bg-green-500 text-black"
                }`}
                onClick={applyJob}
                disabled={isApplied}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </button>
            </div>

            {/* Right section me same company ki other jobs show karne ke liye */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5">
              <h2 className="font-medium text-2xl mb-4 mt-8 text-gray-900 dark:text-white">
                More Jobs From {jobData.companyId.name}
              </h2>

              {jobs
                .filter(
                  (job) =>
                    job._id !== jobData._id &&
                    job.companyId._id === jobData.companyId._id,
                )
                .filter((job) => true)
                .slice(0, 2)
                .map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default ApplyJob;
