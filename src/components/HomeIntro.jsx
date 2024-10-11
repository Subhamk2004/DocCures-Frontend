import React from 'react'
import homedocs from '../assets/images/homedocs.png'
import groupdocs from '../assets/images/groupdocs.png'
import stars from '../assets/images/stars.png'
import { Link } from 'react-router-dom'

function HomeIntro() {
    return (
        <div className='w-full p-4 flex flex-col items-center'>
            <div className='w-[90%] lg:w-[80%] h-[500px] md:h-[450px] lg:h-[600px] min-h-[500px] lg:min-h-[550px] bg-primary rounded-2xl flex flex-row items-center overflow-hidden gap-5 relative'>
                <div className='lg:w-[50%] w-[65%] p-12 ml-5 py-6 flex flex-col'>
                    <h1 className='font-bold lg:leading-[45px] text-white text-4xl lg:text-[40px]'>
                        Schedule Appointment with Trusted Physicians
                    </h1>
                    <div className='flex flex-row gap-2 items-center mt-4'>
                        <img src={groupdocs} className='h-[50px]' />
                        <p className='text-white text-[15px] lg:text-lg'>
                            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
                        </p>
                    </div>
                    <Link to='/allDoctors'>
                        <button className='gap-2 flex flex-row items-center text-textp p-2 mt-4 bg-secondary rounded-3xl px-4 hover:text-black hover:bg-white hover:font-semibold transition-all'>
                            <p>Book Appointment</p>
                            <img src={stars} className='w-[30px]' />
                        </button>
                    </Link>
                </div>
                <div className='w-[45%] lg:w-[50%] flex h-full relative'>
                    <img src={homedocs} className=' max-h-[400px] bottom-0 -mb-5 absolute' />
                </div>
            </div>
        </div>
    )
}

export default HomeIntro