import React from 'react';
import useAppointments from '../hooks/useAppointments';
import { useSelector } from 'react-redux';
import { Book, TimerReset } from 'lucide-react';
import success from '../assets/images/success.png'
import cancel from '../assets/images/cancel.png'

const PreviousAppointmentList = ({ page = 'bookings' }) => {
    console.log(page);
    
    const appointments = useSelector((state) => state.appointments);
    console.log(appointments, 'inside the listing');
    let previousAppointments = appointments.filter((booking) => {
        let appointmentDate = new Date(booking.date).getTime();
        let currentTime = new Date().getTime();
        return appointmentDate < currentTime;
    });
    if (page === 'profile') {
        previousAppointments = previousAppointments.filter((booking, index) => {
            if (index < 2) {
                return booking;
            }
        });
    }

    return (
        <div className='md:w-1/2 w-full flex flex-row gap-6 mt-6 h-full'>
            <div className='p-3 w-full h-full flex flex-col items-center bg-secondary py-6 rounded-xl shadow-md shadow-darkGray gap-3 '>
                <h3 className='text-xl font-semibold text-textp flex flex-row items-center gap-2 mb-6'>
                    <Book className='w-[22px] h-[22px]' />
                    Previous Appointments
                </h3>
                {
                    previousAppointments.map((booking, index) => {
                        return (
                            <div className='w-full p-3 bg-white rounded-xl shadow-lg shadow-darkGray'>
                                <p className='text-lg font-semibold text-black flex flex-row items-center justify-between'>Dr. {booking.doctorName}
                                    {
                                        booking.isPaid ?
                                            <img src={success} className='w-5' />
                                            :
                                            <img src={cancel} className='w-5' />
                                    }

                                </p>
                                <p className='text-lg w-full flex flex-row justify-between font-semibold text-textp items-center mt-1'>
                                    {new Date(booking.date).toLocaleDateString()}
                                    <span>{booking.time}</span>
                                </p>
                                

                                {
                                    booking.isPaid ?
                                        <p className='text-lg font-semibold text-[#19a319]'>₹{booking.fee}</p>
                                        :
                                        <div className='w-full flex flex-row justify-between items-center'>
                                            <p className='text-lg font-semibold text-[#c92626]'>₹{booking.fee}</p>
                                            <span className='text-sm text-textp'>*Your amount has been refunded</span>
                                        </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PreviousAppointmentList;