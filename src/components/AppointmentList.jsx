import React from 'react'
import { Book, Timer, TimerReset, WatchIcon } from 'lucide-react';
import success from '../assets/images/success.png'
import cancel from '../assets/images/cancel.png'

function AppointmentList({
    appointment
}) {
    return (
        <div className='flex flex-row gap-6 mt-6 w-full'>
            <div className='p-3 w-1/2 flex flex-col items-center bg-secondary py-6 rounded-xl shadow-md shadow-darkGray gap-3'>
                <h3 className='text-xl font-semibold text-textp flex flex-row items-center gap-2 mb-6'>
                    <Book className='w-[22px] h-[22px]' />
                    Upcoming Appointments
                </h3>
                {
                    appointment.map((booking, index) => {
                        if (index <= 6) {
                            return (
                                <div className='w-full p-3 bg-white rounded-xl shadow-lg shadow-darkGray'>
                                    <p className='text-lg font-semibold text-black flex flex-row items-center justify-between'>{booking.doctorName}
                                        <TimerReset className='w-6 h-6' />
                                    </p>
                                    <p className='text-lg font-semibold text-textp'>{booking.date}</p>
                                    <p className='text-lg font-semibold text-[#19a319]'>₹{booking.feeCharged}</p>

                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className='p-3 w-1/2 flex flex-col items-center bg-secondary py-6 rounded-xl shadow-md shadow-darkGray gap-3'>
                <h3 className='text-xl font-semibold text-textp flex flex-row items-center gap-2 mb-6'>
                    <Book className='w-[22px] h-[22px]' />
                    Previous Appointments
                </h3>
                {
                    appointment.map((booking, index) => {
                        if (index > 6) {
                            return (
                                <div className='w-full p-3 bg-white rounded-xl shadow-lg shadow-darkGray'>
                                    <p className='text-lg font-semibold text-black flex flex-row items-center justify-between'>{booking.doctorName}
                                        {
                                            booking.success ?
                                                <img src={success} className='w-5' />
                                                :
                                                <img src={cancel} className='w-5' />
                                        }

                                    </p>
                                    <p className='text-lg font-semibold text-textp'>{booking.date}</p>
                                    {
                                        booking.success ?
                                            <p className='text-lg font-semibold text-[#19a319]'>₹{booking.feeCharged}</p>
                                            :
                                            <div className='w-full'>
                                                <p className='text-lg font-semibold text-[#c92626]'>₹{booking.feeCharged}</p>
                                                <span className='text-sm text-textp'>*Your amount has been refunded</span>
                                            </div>
                                    }
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default AppointmentList