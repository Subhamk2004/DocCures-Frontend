import React from 'react'
import HomeIntro from '../components/HomeIntro'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full h-full p-4 flex flex-col items-center'>
      <HomeIntro />
    </div>
  )
}

export default Home