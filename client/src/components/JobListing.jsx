import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { isSearch, searchFilter, setSearchFilter, jobs, isJobsLoading } =
    useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLoacation] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLoacation((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location],
    );
  };

  const clearAllFilters = () => {
  setSearchFilter({ title: "", location: "" });
  setSelectedCategories([]);
  setSelectedLoacation([]);
  setCurrentPage(1);
};

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocation.length === 0 || selectedLocation.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchSearchLocation(job),
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, searchFilter, selectedCategories, selectedLocation]);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row gap-6 max-lg:space-y-8 py-8">
      {/* Sidebar me job filters ko show karne ke liye */}
      <div className="w-full lg:w-1/4 bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-5">
        {/* Jobs load hone tak realistic placeholder cards dikhane ke liye */}
        {isJobsLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-6 animate-pulse"
              >
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded mb-5"></div>

                <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>

                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-6"></div>

                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-6"></div>

                <div className="flex gap-2">
                  <div className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  <div className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search Filter From Hero Component */}
        {isSearch &&
          (searchFilter.title != "" || searchFilter.location != "") && (
            <>
              <h3 className="font-medium text-lg mb-4 text-gray-900 dark:text-white">
                Current Search
              </h3>

              <div className="mb-4 text-gray-600 dark:text-gray-300">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-2.5 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 px-4 py-1.5 rounded text-green-800 dark:text-green-300">
                    {searchFilter.title}

                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}

                {searchFilter.location && (
                  <span className="ml-2 inline-flex items-center gap-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-4 py-1.5 rounded text-gray-700 dark:text-gray-300">
                    {searchFilter.location}

                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                      alt=""
                    />
                  </span>
                )}
              </div>
            </>
          )}

        {/* Mobile filter button */}
        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 dark:border-gray-600 bg-green-400 hover:bg-green-500 text-black transition lg:hidden"
        >
          {showFilter ? "Close" : "Filters"}
        </button>

        <div className={showFilter ? "" : "max-lg:hidden"}>
          {/* Category Filter */}
          <div>
            <h4 className="font-medium text-lg py-4 text-gray-900 dark:text-white">
              Search By Categories
            </h4>

            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              {JobCategories.map((category, index) => (
                <li key={index} className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleCategoryChange(category)}
                    checked={selectedCategories.includes(category)}
                    className="scale-125 accent-green-500"
                  />

                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Location Filter */}
          <div>
            <h4 className="font-medium text-lg py-4 pt-14 text-gray-900 dark:text-white">
              Search By Locations
            </h4>

            <ul className="space-y-4 text-gray-600 dark:text-gray-300">
              {JobLocations.map((location, index) => (
                <li key={index} className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    onChange={() => handleLocationChange(location)}
                    checked={selectedLocation.includes(location)}
                    className="scale-125 accent-green-500"
                  />

                  {location}
                </li>
              ))}
            </ul>
          </div>

          <button
  onClick={clearAllFilters}
  className="w-full mt-8 px-4 py-2 rounded border border-gray-400 dark:border-gray-600 bg-green-400 hover:bg-green-500 text-black font-medium transition"
>
  Clear All Filters
</button>
        </div>
      </div>

      {/* Job Listing */}
      <section className="w-full lg:w-3/4 text-gray-800 dark:text-gray-200 max-lg:px-4">
        <h3
          className="font-medium text-3xl py-2 text-gray-900 dark:text-white"
          id="job-list"
        >
          Latest Jobs
        </h3>

        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Get your desired job from top companies
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs
              .slice((currentPage - 1) * 6, currentPage * 6)
              .map((job, index) => <JobCard key={index} job={job} />)
          ) : !isJobsLoading ? (
            <div className="col-span-full bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-10 text-center">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                No Jobs Found
              </h4>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Try changing your search or filter options.
              </p>
            </div>
          ) : null}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 gap-2 mt-10">
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                src={assets.left_arrow_icon}
                alt=""
                className="cursor-pointer"
              />
            </a>

            {Array.from({
              length: Math.ceil(filteredJobs.length / 6),
            }).map((_, index) => (
              <a key={index} href="#job-list">
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`
                w-10 h-10 flex items-center justify-center
                border rounded transition
                ${
                  currentPage === index + 1
                    ? "bg-green-400 text-black border-green-500"
                    : "bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-400 dark:border-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30"
                }
              `}
                >
                  {index + 1}
                </button>
              </a>
            ))}

            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      currentPage + 1,
                      Math.ceil(filteredJobs.length / 6),
                    ),
                  )
                }
                src={assets.right_arrow_icon}
                alt=""
                className="cursor-pointer"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
