import React from 'react'
import { Link } from 'react-router-dom';

function DoctorProfile({
    doctorList,
    isHomePage
}) {

    console.log(doctorList);
    if (isHomePage && doctorList.length > 10) {
        doctorList = doctorList.slice(0, 10);
    }

    return (
        <div className='w-full flex flex-row gap-5 flex-wrap justify-evenly items-start overflow-scroll no-scrollbar  py-5 rounded-3xl'>
            {
                doctorList.map((doctor) => {
                    return (
                        <div key={doctor._id} className='w-[30%] bg-white rounded-[40px] flex flex-col items-center p-3 py-6 min-w-[300px] max-w-[400px] shadow-md shadow-darkGray mb-3 cursor-pointer hover:scale-105 transition-all duration-300'>
                            <div className="relative h-48 w-full flex justify-center items-center overflow-hidden rounded-2xl">
                                <img
                                    src={doctor.image}
                                    alt={`Dr. ${doctor.name}`}
                                    className="h-full object-center rounded-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <h2 className="text-white text-xl font-bold">Dr. {doctor.name}</h2>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {doctor.available ? 'Available' : 'Not Available'}
                                    </span>
                                </div>
                            </div>
                            <div className="px-4 mt-3 w-full">
                                <p className="text-gray-600 font-medium">{doctor.speciality}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-gray-700 font-semibold">4.8</span>
                                    </div>
                                    <Link to='/allDoctors' className="bg-primary text-white px-4 py-2 rounded-full text-md font-semibold hover:bg-primary-dark transition-colors duration-300">
                                        Book appointment
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DoctorProfile