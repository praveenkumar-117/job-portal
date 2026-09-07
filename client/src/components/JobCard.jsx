import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const JobCard = ({ job }) => {
  const navigate = useNavigate()

  return (
  <div className='bg-gray-200 dark:bg-gray-900 border border-gray-400 dark:border-gray-700 p-6 shadow-sm rounded-xl hover:shadow-md hover:-translate-y-1 transition-all duration-300'>
  <div className='flex justify-between items-center'>
   <img
  src={job.companyId?.image || assets.company_icon}
  alt={job.companyId?.name || "Company"}
  className='h-8 w-8 object-contain rounded'
/>
  </div>

  <h4 className='font-medium text-xl mt-2 text-gray-900 dark:text-white'>
    {job.title}
  </h4>

  <div className='flex items-center gap-3 mt-2 text-xs'>

    <span className='bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 px-4 py-1.5 rounded text-gray-700 dark:text-gray-300'>
      {job.location}
    </span>

    <span className='bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 px-4 py-1.5 rounded text-green-700 dark:text-green-400'>
      {job.level}
    </span>

  </div>

  <p
    dangerouslySetInnerHTML={{
      __html: job.description.slice(0, 150)
    }}
    className='text-gray-600 dark:text-gray-400 text-sm mt-4'
  ></p>

  <div className='mt-4 flex gap-4 text-sm'>

    <button
      onClick={() => {
        navigate(`/apply-job/${job._id}`)
        scrollTo(0, 0)
      }}
      className='bg-green-400 hover:bg-green-500 text-black px-4 py-2 rounded transition'
    >
      Apply now
    </button>

    <button
      onClick={() => {
        navigate(`/apply-job/${job._id}`)
        scrollTo(0, 0)
      }}
      className='text-gray-600 dark:text-gray-300 border border-gray-500 dark:border-gray-600 rounded px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-800 transition'
    >
      Learn More
    </button>

  </div>

</div>
  )
}

export default JobCard
