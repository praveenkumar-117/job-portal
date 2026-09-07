import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify"
import Quill from "quill";
import { JobCategories, JobLocations } from "../assets/assets";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";

const AddJob = () => {
  const { backendUrl } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("Banglore");
  const [category, setcategory] = useState("Programming");
  const [level, setLevel] = useState("Beginner level");
  const [salary, setSalary] = useState("0");
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  // Edit mode ke liye URL se existing job ki ID read karne ke liye
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("id");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("companyToken");
    // Job post karne se pehle recruiter login/token check karne ke liye
    if (!token) {
      toast.info("Please login as recruiter");
      return;
    }

    const description = quillRef.current.root.innerHTML;

    // Job submit karne se pehle required fields validate karne ke liye
    if (!title.trim()) {
      toast.info("Please enter job title");
      return;
    }

    if (!quillRef.current || !quillRef.current.root.innerText.trim()) {
      toast.info("Please enter job description");
      return;
    }

    if (!salary || Number(salary) <= 0) {
      toast.info("Please enter a valid salary");
      return;
    }

    try {
      console.log("Job ID for update:", jobId)
      const response = await fetch(
        `${backendUrl}/api/company/${jobId ? "update-job" : "post-job"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
          body: JSON.stringify({
              id: jobId,
            title,
            description,
            category,
            location,
            level,
            salary,
          }),
        },
      );

      const data = await response.json();

      console.log("Add Job response:", data);

      if (data.success) {
        toast.success(jobId ? "Job updated successfully" : "Job added successfully");
        // Job successfully add hone ke baad form fields reset karne ke liye
        setTitle("");
        setSalary("0");

        if (quillRef.current) {
          quillRef.current.setText("");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Add Job error:", error);
      toast.error("Unable to connect with server");
    }
  };

  useEffect(() => {
    //Initiate Quill Only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  // Edit mode me existing job ki details backend se fetch karne ke liye
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) return;

      try {
        const response = await fetch(`${backendUrl}/api/jobs/${jobId}`);

        const data = await response.json();

        console.log("Edit job response:", data);

        if (data.success) {
          const job = data.job;

          setTitle(job.title);
          setLocation(job.location);
          setcategory(job.category);
          setLevel(job.level);
          setSalary(job.salary);

          if (quillRef.current) {
            quillRef.current.root.innerHTML = job.description;
          }
        }
      } catch (error) {
        console.log("Edit job fetch error:", error);
      }
    };

    fetchJobDetails();
  }, [jobId, backendUrl]);

  return (
   <form
  className="container w-full p-4 flex flex-col items-start gap-3 text-gray-800 dark:text-gray-200"
  onSubmit={onSubmitHandler}
>

  {/* Job ki basic information create/update karne ke liye */}
  <div className="w-full">
    <p className="mb-2 font-medium">Job Title</p>

    <input
      type="text"
      placeholder="Type Here"
      value={title}
      required
      onChange={(e) => setTitle(e.target.value)}
      className="w-full max-w-lg py-2 px-3 border-2 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded outline-none focus:border-green-400"
    />
  </div>


  <div className="w-full max-w-lg">

    <p className="mb-5 font-medium">Job Description</p>

    <div ref={editorRef}></div>

  </div>


  {/* Job category, location aur level select karne ke liye */}
  <div className="flex flex-col sm:flex-row gap-4 w-full sm:gap-8">

    <div>
      <p className="mb-2 font-medium">Job Category</p>

      <select
        onChange={(e) => setcategory(e.target.value)}
        className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded outline-none focus:border-green-400"
      >
        {JobCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>


    <div>
      <p className="mb-2 font-medium">Job Location</p>

      <select
        onChange={(e) => setLocation(e.target.value)}
        className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded outline-none focus:border-green-400"
      >
        {JobLocations.map((location, index) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>


    <div>
      <p className="mb-2 font-medium">Job Level</p>

      <select
        onChange={(e) => setLevel(e.target.value)}
        className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded outline-none focus:border-green-400"
      >
        <option value="Beginner level">Beginner level</option>
        <option value="Intermediate level">Intermediate level</option>
        <option value="Senior level">Senior level</option>
      </select>
    </div>

  </div>


  {/* Job ki salary enter karne ke liye */}
  <div>

    <p className="mb-2 font-medium">Job Salary</p>

    <input
      type="number"
      min={0}
      placeholder="20000"
      value={salary}
      onChange={(e) => setSalary(e.target.value)}
      className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded sm:w-[120px] outline-none focus:border-green-400"
    />

  </div>


  {/* Job ko add ya update karne ke liye submit button */}
  <button
    className="w-32 py-3 mt-4 bg-green-400 hover:bg-green-500 text-black font-medium rounded transition"
  >
    {jobId ? "Update Job" : "Add Job"}
  </button>

</form>
  );
};

export default AddJob;
