import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const DashBoard = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen'>
      {/* NavBar for Recruiter pannel */}
      <div className='shadow py-4'>
        <div className='px-5 flex justify-between items-center'>
          <img onClick={e => navigate('/')} src={assets.logo} alt="" className='maxx-sm:w-32 cursor-pointer' />
          <div className='flex items-center gap-3 '>
            <p className='max-sm:hidden'>Welcome,  Praveen Kumar</p>
            <div className='relative group'>
              <img src={assets.company_icon} alt="" className='w-8 border rounded-full ' />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm '>
                  <li className='py-1 px-2 cursor-pointer pr-10 rounded-md text-center hover:bg-gray-100'>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className='flex items-start'>
        {/* Left Side Bar With options */}
        <div className='border-r-2  inline-block min-h-screen'>
          <ul className='flex flex-col items-start pt-5 text-gray-800'>
            <NavLink to={'/dashboard/add-job'} className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bgblue-100 border-r-4 border-blue-500'}`}>
              <img src={assets.add_icon} alt="" className='min-w-4 ' />
              <p className='max-sm:hidden'>Add Job</p>
            </NavLink>

            <NavLink to={'/dashboard/manage-job'} className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bgblue-100 border-r-4 border-blue-500'}`}>
              <img src={assets.home_icon} alt="" className='min-w-4 ' />
              <p className='max-sm:hidden'>Manage Jobs</p>
            </NavLink>

            <NavLink to={'/dashboard/view-applications'} className={({isActive})=>`flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bgblue-100 border-r-4 border-blue-500'}`}>
              <img src={assets.person_tick_icon} alt="" className='min-w-4 ' />
              <p className='max-sm:hidden'>View Applications</p>
            </NavLink>
          </ul>

        </div>
        <div className=''>
          <Outlet />
        </div>
      </div>


    </div>
  )
}

export default DashBoard
