import React, { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png'
import user from '../assets/images/user.png'
import create from '../assets/images/create.png'
import login from '../assets/images/login.png'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import emergency from '../assets/images/emergency.png'
import emergencyBlack from '../assets/images/emergencyBlack.png'
import SmNavbar from './SmNavbar'

function Navbar() {
  let { isAuthenticated } = useSelector(state => state.user);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  let activeLink = 'text-primary font-bold cursor-pointer bg-white hover:text-primary hover:bg-secondary hover:p-1 hover:rounded-lg hover:px-2 hover:text-[20px] transition-all'

  let inactiveLink = 'text-textp font-semibold cursor-pointer hover:text-primary hover:bg-secondary hover:p-1 hover:rounded-lg hover:px-2 hover:text-[18px] transition-all'

  return (
    <div className=' w-full p-4 flex flex-col items-center '>
      {
        windowWidth > 768 ?
          <nav className=' h-20 flex flex-row items-center md:w-full lg:w-[80%] shadow-md shadow-[#D6D6D6] rounded-3xl overflow-hidden bg-[#ffffff] justify-between pr-3'>
            <NavLink to='/' className='flex flex-row items-center h-full'>
              <img src={logo}
                className='lg:h-full md:h-[85%]'
              />
              <h1 className='font-bold md:text-[24px] lg:text-[28px] text-[#1c2635] '>DocCures</h1>
            </NavLink>
            <ul className='flex flex-row items-center lg:gap-7 gap-4 font-semibold text-textp text-[18px]'>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }>
                Home
              </NavLink>
              <NavLink
                to="/allDoctors"
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }>
                All Doctors
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }>
                About
              </NavLink>
              {
                !isAuthenticated ?
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? activeLink : inactiveLink
                    }>
                    Contact
                  </NavLink>
                  :
                  null
              }

            </ul>
            {
              isAuthenticated ?
                <div className='flex flex-row gap-3'>
                  <NavLink to='/emergency' className="p-2 bg-softGray rounded-2xl px-4 lg:px-5 lg:py-3 text-black shadow-md shadow-darkGray font-semibold  flex flex-row gap-2 items-center hover:bg-[#f3e5e5]">
                    Emergency
                    <img src={emergency} className='md:h-[25px] lg:w-[30px] lg:h-[30px]' />
                  </NavLink>
                  <NavLink to='/profile' className="p-2 bg-primary rounded-2xl px-4 lg:px-5 lg:py-3 text-white font-semibold  flex flex-row gap-2 items-center hover:bg-[#28479c]">
                    Profile
                    <img src={user} className='md:h-[25px] lg:w-[30px] lg:h-[30px]' />
                  </NavLink>
                </div>
                :
                <div className='flex flex-row items-center gap-2 lg:gap-3'>
                  <NavLink to='/signup' className="p-2 bg-primary rounded-2xl px-2 lg:px-4 text-white font-semibold  flex flex-row gap-2 items-center hover:bg-[#28479c]">
                    Sign up
                    <img src={create} className='md:h-[25px] lg:w-[30px] lg:h-[30px]' />
                  </NavLink>
                  <NavLink to='/login' className="p-2 bg-primary rounded-2xl px-2 lg:px-4 text-white font-semibold  flex flex-row gap-2 items-center hover:bg-[#28479c]">
                    Login
                    <img src={login} className='md:h-[25px] lg:w-[30px] lg:h-[30px]' />
                  </NavLink>
                </div>
            }

          </nav>
          :
          <SmNavbar isAuthenticated={isAuthenticated} />
      }
    </div>
  )
}

export default Navbar