import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: ""

  })


  const [isSearch, setIsSearch] = useState(false)
  const [jobs, setJobs] = useState([])

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)


  // function to fetch jobs
  const fetchJobs = async () => {
    setJobs(jobsData)
  }

  useEffect(() => {
    fetchJobs();
  }, [])

  const value = {
    searchFilter, setSearchFilter,
    isSearch, setIsSearch,
    jobs, setJobs,
    showRecruiterLogin, setShowRecruiterLogin,
  }

  return (<AppContext.Provider value={value}>
    {children}
  </AppContext.Provider>)
}

export default AppContextProvider;