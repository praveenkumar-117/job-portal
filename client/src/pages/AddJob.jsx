import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
import Footer from '../components/Footer'

const AddJob = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('Banglore')
  const [category, setcategory] = useState('Programming')
  const [level, setLevel] = useState('Beginner level')
  const [salary, setSalary] = useState('0')
  const editorRef = useRef(null)
  const quillRef = useRef(null)


  useEffect(() => {
    //Initiate Quill Only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  return (
    <form className='container w-full p-4 flex flex-col items-start gap-3 text-gray-800'>
      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input type='text' placeholder='Type Here' value={title} required onChange={e => setTitle(e.target.value)}
          className='w-full max-w-lg py-2 px-3 border-2 border-gray-300 rounded' />
      </div>

      <div className='w-full max-w-lg'>
        <p className='mb-5'>Job Description</p>
        <div ref={editorRef}>

        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Job Category</p>
          <select onChange={e => setcategory(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300 rounded'>
            {JobCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Location</p>
          <select onChange={e => setLocation(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300 rounded'>
            {JobLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Job Level</p>
          <select onChange={e => setLevel(e.target.value)} className='w-full px-3 py-2 border-2 border-gray-300 rounded'>
            <option value='Beginner level'>Beginner level</option>
            <option value='Intermediat level'>Intermediate level</option>
            <option value='Senior level'>Senior level</option>
          </select>
        </div>
      </div>
      <div>
        <p className='mb-2'>Job Salary</p>
        <input type="Number" min={0} placeholder='2500' onChange={e => setSalary(e.target.value)} className='w-full px-3 py-2 bottom-2 border-gray-300 rounded sm:w-[120px]' />
      </div>
      <button className='w-28 py-3 mt-4 bg-black text-white rounded'>Add Job</button>

    </form>

  )
}

export default AddJob
