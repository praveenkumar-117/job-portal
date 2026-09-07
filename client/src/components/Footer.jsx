import React from 'react'
import { assets } from '../assets/assets'
import { BsInstagram } from 'react-icons/bs';
import { FiTwitter } from 'react-icons/fi';
import { FaSquareFacebook } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className='bg-gray-900 dark:bg-black text-white '>

      <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-5'>

        {/* Footer me website logo show karne ke liye */}
        <div className='bg-white rounded-md px-2 py-1'>
          <img width={160} src={assets.logo} alt="" />
        </div>

        <p className='flex-1 border-l border-gray-600 text-sm pl-4 text-gray-400 max-sm:hidden'>
          Copyright @Praveen Kumar | All right reserved.
        </p>

        {/* Social media icons ko hover effect ke saath show karne ke liye */}
        <div className='flex gap-2.5'>

          <div className='w-[38px] h-[38px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-400 hover:text-black transition cursor-pointer'>
            <FaSquareFacebook />
          </div>

          <div className='w-[38px] h-[38px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-400 hover:text-black transition cursor-pointer'>
           <FiTwitter />
          </div>

          <div className='w-[38px] h-[38px] rounded-full border border-gray-300 flex items-center justify-center hover:bg-green-400 hover:text-black transition cursor-pointer'>
            
            <BsInstagram />
          </div>

        </div>

      </div>
    </div>
  )
}

export default Footer