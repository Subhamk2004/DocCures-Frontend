import React from 'react'
import AboutImg from '../assets/images/aboutimg.png'
import Developer from '../assets/images/developer.png'
import github from '../assets/images/github.png'
import linkedin from '../assets/images/linkedin.png'

function About() {
  return (
    <div className='w-[90%] md:w-[80%] lg:w-[60%]'>
      <div className='w-full flex flex-row mt-10 items-center'>
        <div className='w-[50%] flex flex-col'>
          <h1 className='text-center font-bold text-black text-2xl mb-5'>
            Our <span className='text-primary'> Vision</span>
          </h1>
          <div className='w-full flex flex-col gap-4 text-sm md:text-base text-textp text-justify'>
            <p>
              We believe that everyone should have access to quality healthcare. We are on a mission to connect patients with doctors, and make healthcare accessible to all.
            </p>
            <p>
              Our platform helps patients find the right doctor, and book appointments with ease. We are committed to providing a seamless experience for patients and doctors.
            </p>
          </div>
        </div>
        <div className='w-[50%] '>
          <img src={AboutImg} className=' w-full' />
        </div>
      </div>
      
    </div>
  )
}

export default About