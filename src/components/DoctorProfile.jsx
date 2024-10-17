import React from 'react';
import { User, Star, Edit,  Calendar } from 'lucide-react';
import verified from '../assets/images/verified.png'
import AlertDisplay from './AlertDisplay';
import { Link } from 'react-router-dom';

function DoctorProfile({ doctorList, isHomePage }) {

    console.log(isHomePage);
    if (doctorList === undefined) {
        return <AlertDisplay alertType='error' alertMessage='Error fetching the doctors' />
    }

    return (
        <div className="flex flex-row flex-wrap items-center justify-center gap-6 py-6 no-scrollbar">
            {doctorList.map((doctor) => (
                <div key={doctor._id} className="bg-white rounded-2xl shadow-md shadow-darkGray overflow-hidden transition-all duration-300 w-[270px] hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative flex justify-center">
                        <img
                            src={doctor.image}
                            alt={`Dr. ${doctor.name}`}
                            className="w-[97%] h-52 pt-4 object-cover object-top"
                        />
                    </div>

                    <div className="p-4">
                        <div className='flex flex-row items-center gap-1 mb-1'>
                            <h2 className="text-2xl font-semibold text-gray-800 ">Dr. {doctor.name}  </h2>
                            <img src={verified} className='w-[20px]' />
                        </div>
                        <p className=" text-gray-600 mb-1">{doctor.speciality}</p>
                        <div className="w-full mb-4">
                            {
                                doctor.available ?
                                    <div className='flex flex-row  items-center gap-2'>
                                        <div className='w-[20px] h-[20px] rounded-full bg-[#a5ffa5] flex flex-row justify-center items-center'>
                                            <div className='w-[10px] h-[10px] rounded-full bg-[#2ec92e]'>
                                            </div>
                                        </div>
                                        <p className='text-lg font-semibold text-[green]'>Available</p>
                                    </div>
                                    :
                                    <div className='flex flex-row  items-center gap-2'>
                                        <div className='w-[20px] h-[20px] rounded-full bg-[#ffa5a5] flex flex-row justify-center items-center'>
                                            <div className='w-[10px] h-[10px] rounded-full bg-[#dd4444]'>
                                            </div>
                                        </div>
                                        <p className='text-lg font-semibold text-[red]'>Unavailable</p>
                                    </div>
                            }
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <Link to={`/bookAppointment/${doctor._id}`} className="w-full flex items-center px-3 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-[#0000ffb6] duration-300 gap-2">
                                <Calendar className='text-white w-[20px] h-[20px]' size={20}/>
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DoctorProfile;