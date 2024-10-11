import React, { useState } from 'react'
import useDoctorList from '../hooks/useDoctorList';
import IncomponentLoading from './IncomponentLoading';
import DoctorProfile from './DoctorProfile';
import { Link } from 'react-router-dom';

function DocList() {

  let [showWarning, setShowWarning] = useState(false)
  let { doctorList, isLoading, error } = useDoctorList();

  return (
    <div className='w-full p-4'>
      <div className='w-full bg-softGray rounded-3xl flex flex-col items-center overflow-hidden no-scrollbar'>
        <div className='h-[20%] w-full flex flex-col items-center'>
        </div>
        <div className='h-[80%] w-full items-center flex flex-col gap-5 p-4'>
          {
            isLoading ?
              <IncomponentLoading />
              :
              null
          }
          <DoctorProfile
            doctorList={doctorList}
            isHomePage={true}
          />
          <Link to='/allDoctors' className='bg-darkGray text-black px-4 py-2 rounded-full text-md font-semibold hover:bg-primary-dark transition-colors duration-300'>
            View All Doctors
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DocList