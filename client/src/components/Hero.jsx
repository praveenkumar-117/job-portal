import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {
  const { setSearchFilter, setIsSearch } = useContext(AppContext)
  const titleRef = useRef(null);
  const loactionRef = useRef(null)

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: loactionRef.current.value
    })
    setIsSearch(true)
  }

  return (
    <div className='container 2xl:px-20 mx-auto my-10'>
      <div className='bg-gradient-to-r from-indigo-800 to-indigo-950 text-white py-16 text-center mx-2 rounded-xl'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000+ jobs to apply</h2>
        <p className='mb-8 max-w-xl mx-auto text-sm font-normal px-5 text-center'>Your Next Big Career Move Starts Right Here-Explore The Best Job Operchunities And Take The Firsdt Step Toward Your Future!</p>

        <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
          <div className='flex items-center'>
            <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
            <input type="text" placeholder='Search For Jobs'
              className='max-sm:text-xs p-2 rounded outline-none w-full'
              ref={titleRef} />
          </div>

          <div className='flex items-center'>
            <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
            <input type="text" placeholder='Location'
              className='max-sm:text-xs p-2 rounded outline-none w-full'
              ref={loactionRef} />
          </div>
          <button className='bg-blue-600  text-xs px-10 py-2 rounded text-white m-1 hover:bg-blue-800 hover:font-semibold'
            onClick={onSearch}>Search</button>
        </div>
      </div>

      <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex '>
        <div className='flex justify-center gap-20 flex-wrap'>
          <p className='font-medium'>Trusted By </p>
          <img className='h-6 hover:scale-110 transition-transform duration-300 ' src={assets.accenture_logo} alt="" />
          <img className='h-6 hover:scale-110 transition-transform duration-300' src={assets.adobe_logo} alt="" />
          <img className='h-6 hover:scale-110 transition-transform duration-300' src={assets.walmart_logo} alt="" />
          <img className='h-6 hover:scale-110 transition-transform duration-300' src={assets.samsung_logo} alt="" />
          <img className='h-6 hover:scale-110 transition-transform duration-300' src={assets.microsoft_logo} alt="" />
          <img className='h-6 hover:scale-110 transition-transform duration-300' src={assets.amazon_logo} alt="" />
        </div>
      </div>

    </div>
  )
}

export default Hero
