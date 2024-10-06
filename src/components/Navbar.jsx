import React from 'react'
import logo from '../assets/images/logo.png'
import logoFull from '../assets/images/logofull.png'
import create from '../assets/images/create.png'
import login from '../assets/images/login.png'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  let activeLink = 'text-primary font-bold cursor-pointer bg-white hover:text-primary hover:bg-secondary hover:p-1 hover:rounded-lg hover:px-2 hover:text-[20px] transition-all'

  let inactiveLink = 'text-textp font-semibold cursor-pointer hover:text-primary hover:bg-secondary hover:p-1 hover:rounded-lg hover:px-2 hover:text-[18px] transition-all'

  return (
    <div className=' w-full p-4'>
      <nav className=' h-20 flex flex-row items-center w-full shadow-md shadow-[#D6D6D6] rounded-3xl overflow-hidden bg-[#ffffff] justify-between pr-3'>
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

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? activeLink : inactiveLink
            }>
            Contact
          </NavLink>
        </ul>
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
      </nav>
    </div>
  )
}

export default Navbar