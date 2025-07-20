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
      <div className='w-full mt-10 flex flex-col'>
        <h2 className='text-center font-bold text-black text-2xl mb-5'>
          Meet the <span className='text-primary'>Developer</span>
        </h2>
        <div className='w-full flex flex-row gap-6 items-center text-textp'>
          <div className='w-auto '>
            <div className='rounded-full border-primary border-[3px] h-[175px] w-[175px] flex justify-center items-center overflow-hidden '>
              <div className='rounded-full  overflow-hidden h-[160px] w-[160px]'>
                <img src={Developer} className='object-cover h-[190px] -ml-2 ' />
              </div>
            </div>
          </div>
          <div className='w-[60%]'>
            <p className='text-[16px] md:text-base'>
              Hi! I am Subham Kumar a full-stack developer with experience in building web applications. I am passionate about creating user-friendly applications that solve real-world problems.
            </p>
          </div>
        </div>
        <p className='text-textp mt-5 text-[16px] md:text-base'>
          I am skilled in JavaScript, React.js, React Native, Next.js, Node.js, Express, MongoDB, and more. I am excited to work on projects that challenge me and help me grow as a developer.
        </p>
        <p className='mt-20 text-center text-textp'>
          Follow me on below platforms to stay updated with my work.
        </p>
        <div className=' mt-5 flex w-full flex-row justify-evenly
        '>
          <button className=' bg-black rounded-xl overflow-hidden flex flex-row'>
            <a href='https://github.com/Subhamk2004' target='_blank' className='text-white bg-black flex flex-row items-center p-3 px-5 gap-2'>
              <img src={github} alt="Github" className='h-[30px] z-10 ' />
              <p className='text-xl'>Github</p>
            </a>
          </button>
          <button className='bg-[#007ab9] border-2 rounded-xl overflow-hidden flex flex-row'>
            <a href='https://www.linkedin.com/in/subham-kumar-73b98b252/'  target='_blank'  className='text-white bg-white flex flex-row items-center p-3 px-5 gap-2'>
              <img src={linkedin} alt="in" className='h-[30px] z-10 ' />
              <p className='text-xl text-[#007ab9] font-bold'>LinkedIn</p>
            </a>
          </button>
        </div>
      </div>
    </div>
  )
}

export default About