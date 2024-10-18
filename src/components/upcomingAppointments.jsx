import React from 'react';
import useAppointments from '../hooks/useAppointments';
import { useSelector } from 'react-redux';
import { Book, TimerReset } from 'lucide-react';
import success from '../assets/images/success.png'
import cancel from '../assets/images/cancel.png'

const UpcomingAppointmentList = ({ page = 'bookings' }) => {
    const appointments = useSelector((state) => state.appointments);
    console.log(appointments, 'inside the listing');
    let upcomingAppointments = appointments.filter((booking) => {
        let appointmentDate = new Date(booking.date).getTime();
        let currentTime = new Date().getTime();
        return appointmentDate > currentTime;
    });
    if (page === 'profile') {
        upcomingAppointments = upcomingAppointments.filter((booking, index) => {
            if (index < 2) {
                return booking;
            }
        });
    }

    return (
        <div className='w-full flex flex-row gap-6 mt-6 md:w-1/2 h-full'>
            <div className='p-3 w-full flex flex-col items-center bg-secondary py-6 rounded-xl shadow-md shadow-darkGray gap-3 '>
                <h3 className='text-xl font-semibold text-textp flex flex-row items-center gap-2 mb-6'>
                    <Book className='w-[22px] h-[22px]' />
                    Upcoming Appointments
                </h3>
                {
                    upcomingAppointments.map((booking, index) => {

                        return (
                            <div className='w-full p-3 bg-white rounded-xl shadow-lg shadow-darkGray'>
                                <p className='text-lg font-semibold text-black flex flex-row items-center justify-between'>Dr. {booking.doctorName}
                                    <TimerReset className='w-6 h-6' />
                                </p>
                                <p className='text-lg w-full flex flex-row justify-between font-semibold text-textp items-center mt-1'>
                                    {new Date(booking.date).toLocaleDateString()}
                                    <span>{booking.time}</span>
                                </p>
                                <p className='text-lg font-semibold text-[#19a319]'>₹{booking.fee}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default UpcomingAppointmentList;