import React, { useState } from 'react'
import useDoctorList from '../hooks/useDoctorList';
import IncomponentLoading from './IncomponentLoading';
import DoctorProfile from './DoctorProfile';
import { Link } from 'react-router-dom';
import AlertDisplay from './AlertDisplay';
import { useNavigate } from 'react-router-dom';

function DocList({
  isHomePage = false,
  speciality,
  isMobile = false
}) {

  let [showWarning, setShowWarning] = useState(false)
  let { doctorList, isLoading, error } = useDoctorList();
  let navigate = useNavigate();

  if (doctorList === undefined) {
    return <AlertDisplay alertType='error' alertMessage='Error fetching the doctors' />
  }

  if (isHomePage) {
    if (doctorList.length > 1)
      doctorList = doctorList.slice(0, 10)
  }
  if(isMobile) {
    if(doctorList.length > 1)
      doctorList = doctorList.slice(0, 4)
  }
  let filteredDoctorList = doctorList;
  if (speciality !== undefined) {
    filteredDoctorList = doctorList.filter((doctor) => doctor.speciality === speciality);
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <div className='w-full lg:w-[90%] bg-softGray rounded-3xl flex flex-col items-center overflow-hidden no-scrollbar'>
        <div className='h-[80%] w-full items-center flex flex-col'>
          {
            isLoading ?
              <IncomponentLoading />
              :
              null
          }
          <DoctorProfile
            doctorList={filteredDoctorList}
            isHomePage={isHomePage}
            isMobile={isMobile}
          />
          {
            isHomePage ?
              <Link to='/allDoctors' className='bg-darkGray text-textp px-4 py-2 mt-8 mb-12 rounded-full  hover:bg-[gray] hover:text-white transition-colors duration-300 '>
                View All Doctors
              </Link>
              :
              null
          }

        </div>
      </div>
    </div>
  )
}

export default DocList