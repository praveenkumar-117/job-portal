import { createContext, useEffect, useState } from "react";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = "http://localhost:9000";
  

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearch, setIsSearch] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [isJobsLoading, setIsJobsLoading] = useState(true);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [company, setCompany] = useState(null);

  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  // Saved theme ke according HTML document par dark class apply karne ke liye
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // function to fetch logged-in company
  const fetchCompany = async () => {
    const token = sessionStorage.getItem("companyToken");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/company/company`, {
        method: "GET",
        headers: {
          token: token,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCompany(data.company);
      } else {
        console.log("Company fetch failed:", data.message);
      }
    } catch (error) {
      console.log("Error fetching company:", error.message);
    }
  };

  // function to fetch jobs
  const fetchJobs = async () => {
    try {
      setIsJobsLoading(true);
      const response = await fetch(`${backendUrl}/api/jobs`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();

      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (error) {
      console.log("Error fetching jobs:", error.message);
    } finally {
      setIsJobsLoading(false);
    }
  };

  // Browser refresh ke baad saved job seeker information restore karne ke liye
  const fetchUser = () => {
    const userData = sessionStorage.getItem("userData");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchCompany();
    fetchUser();
  }, []);

  const value = {
    backendUrl,
    searchFilter,
    setSearchFilter,
    isSearch,
    setIsSearch,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    company,
    setCompany,
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    isJobsLoading,
    setIsJobsLoading,
    isDarkMode,
    setIsDarkMode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
