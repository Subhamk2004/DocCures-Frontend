import React from 'react'
import HomeIntro from '../components/HomeIntro'
import HorizontalList from '../components/HorizontalList'
import DocList from '../components/DocList'
import { Link } from 'react-router-dom'
import doc1C from '../assets/images/doc1.png'

function Home() {
  return (
    <div className='w-full h-full p-4 flex flex-col items-center overflow-scroll'>
      <HomeIntro />
      <div className=' w-[70%] flex flex-col items-center'>
        <h2 className='text-[#272727] text-3xl font-semibold mt-8'>
          Get your Specialist
        </h2>
        <p className='mt-4 w-[60%] lg:w-[45%] text-center text-textp'>
          Effortlessly explore our wide range of trusted doctors and book your appointment with ease.
        </p>
        <HorizontalList />
      </div>
      <div className='mt-32 w-full flex flex-col items-center'>
        <h2 className='text-3xl font-bold text-[#272727]'>
          Top Doctors to Book
        </h2>
        <DocList isHomePage={true} />
      </div>
      <div className='w-[75%] lg:w-[70%] h-[350px] md:h-[400px] lg:h-[550px] rounded-3xl bg-primary flex flex-row'>
        <div className='w-[70%] lg:w[55%] h-full  p-10 flex flex-col gap-4 justify-center'>
          <span className='text-4xl lg:text-5xl font-bold text-white leading-[45px] lg:leading-[60px]'>Book Appointment with 100+ Trusted Doctors</span>
          <Link to="/signup">
          <button className='rounded-3xl px-6 py-3 bg-softGray hover:bg-white text-textp hover:text-black lg:text-xl lg:font-semibold'>
            Create Account
          </button>
          </Link>
        </div>
        <div className='w-[40%] lg:w-[45%] h-[100%] flex items-end overflow-hidden rounded-3xl'>
          <img src={doc1C} className='w-[90%] max-w-[500px] lg:mt-10'/>
        </div>
      </div>
    </div>
  )
}

export default Home