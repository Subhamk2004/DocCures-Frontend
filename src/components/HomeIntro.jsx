import React from 'react'
import homedocs from '../assets/images/homedocs.png'
import groupdocs from '../assets/images/groupdocs.png'
import stars from '../assets/images/stars.png'
import { Link } from 'react-router-dom'

function HomeIntro({
    windowWidth
}) {
    return (
        <div className='w-full p-4 flex flex-col items-center'>
            <div className='w-[100%] lg:w-[80%] h-[350px] md:h-[450px] lg:h-[600px]  lg:min-h-[550px] bg-primary rounded-2xl flex flex-row items-center overflow-hidden gap-5 relative'>
                <div className='w-[80%] lg:w-[50%] md:w-[65%] md:p-12 ml-5 py-6 flex flex-col'>
                    <h1 className='font-bold lg:leading-[45px] text-white text-2xl md:text-4xl lg:text-[40px]'>
                        Schedule Appointment with Trusted Physicians
                    </h1>
                    <div className='flex flex-row gap-2 items-center mt-4'>
                        <img src={groupdocs} className='h-[30px] md:h-[50px]' />
                        <p className='text-white text-[12px] md:text-[15px] lg:text-lg'>
                            Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
                        </p>
                    </div>
                    <Link to='/allDoctors'>
                        <button className='gap-2 flex bg-white flex-row items-center md:text-textp p-2 mt-4 md:bg-secondary rounded-3xl px-4 hover:text-black hover:bg-white md:hover:font-semibold transition-all'>
                            <p className='text-sm md:text-base'>Book Appointment</p>
                            <img src={stars} className='w-[20px] md:w-[30px]' />
                        </button>
                    </Link>
                </div>
                {
                    windowWidth > 768 &&
                    <div className='w-[45%] lg:w-[50%] flex h-full relative'>
                        <img src={homedocs} className=' max-h-[400px] bottom-0 -mb-5 absolute' />
                    </div>
                }
            </div>
        </div>
    )
}

export default HomeIntro