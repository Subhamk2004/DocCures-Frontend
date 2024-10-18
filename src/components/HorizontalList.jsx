import React from 'react'
import General from '../assets/images/generaldoc.svg'
import Gynecologist from '../assets/images/Gynecologist.svg'
import skin from '../assets/images/skin.svg'
import Pediatricians from '../assets/images/Pediatricians.svg'
import Neurologist from '../assets/images/Neurologist.svg'
import { Link } from 'react-router-dom'

function HorizontalList() {
    return (
        <div className='flex flex-row items-center mt-6 gap-6 overflow-scroll md:overflow-auto w-[330px] sm:w-auto no-scrollbar'>
            <Link to="/allDoctors/genralDoc">
                <button className='flex flex-col items-center'>
                    <img src={General} className='w-[80px] lg:w-[100px]' />
                    <p className='text-sm lg:text-lg'>General physician</p>
                </button>
            </Link>
            <Link to="/allDoctors/Gynecologist">
                <button className='flex flex-col items-center'>
                    <img src={Gynecologist} className='w-[80px] lg:w-[100px]' />
                    <p className='text-sm lg:text-lg'>Gynecologist</p>
                </button>
            </Link>
            <Link to="/allDoctors/Dermatologist">
                <button className='flex flex-col items-center'>
                    <img src={skin} className='w-[80px] lg:w-[100px]' />
                    <p className='text-sm lg:text-lg'>Dermatologist</p>
                </button>
            </Link>
            <Link to="/allDoctors/Pediatricians">
                <button className='flex flex-col items-center'>
                    <img src={Pediatricians} className='w-[80px] lg:w-[100px]' />
                    <p className='text-sm lg:text-lg'>Pediatricians</p>
                </button>
            </Link>
            <Link to="/allDoctors/Neurologist">
                <button className='flex flex-col items-center'>
                    <img src={Neurologist} className='w-[80px] lg:w-[100px]' />
                    <p className='text-sm lg:text-lg'>Neurologist</p>
                </button>
            </Link>
        </div>
    )
}

export default HorizontalList