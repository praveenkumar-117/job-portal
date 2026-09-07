import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto my-20 '>
      {/* Mobile app section ko project ke gray theme ke saath consistent rakhne ke liye */}
<div className='relative bg-gray-200 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 sm:p-24 lg:p-32 rounded-2xl shadow-sm'>
        <div >
        <h1 className='text-2xl sm:text-4xl font-bold mb-8 max-w-md text-gray-900 dark:text-white'>
  Download Mobile App For Better Experience
</h1>
          <div className='flex gap-4'>
            <a href='#' className='inline-block'>
              <img src={assets.play_store} alt="" className='h-12'/>
            </a>
            <a href='#' className='inline-block'>
              <img src={assets.app_store} alt="" className='h-12'/>
            </a>
          </div>
        </div>
        <img src={assets.app_main_img} alt="" className='absolute w-80 right-0 mr-32 bottom-0 max-lg:hidden '/>
      </div>

    </div>
  )
}

export default AppDownload
