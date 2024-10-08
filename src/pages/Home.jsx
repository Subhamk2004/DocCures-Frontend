import React from 'react'
import HomeIntro from '../components/HomeIntro'
import HorizontalList from '../components/HorizontalList'
import DocList from '../components/DocList'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full h-full p-4 flex flex-col items-center'>
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
      <div className='mt-32'>
        <h2 className='text-3xl font-bold text-[#272727]'>
          Top Doctors to Book
        </h2>
        <DocList />
      </div>
    </div>
  )
}

export default Home