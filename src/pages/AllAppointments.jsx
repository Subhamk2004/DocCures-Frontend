import React from 'react'
import useAppointments from '../hooks/useAppointments.mjs'
import UpcomingAppointmentList from '../components/upcomingAppointments';
import PreviousAppointmentList from '../components/PreviousAppointments';
import Loading from '../components/Loading';
import AlertDisplay from '../components/AlertDisplay';

function AllAppointments() {
    const { isLoading, error } = useAppointments();

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <AlertDisplay />
    }

    return (
        <div className='w-[95%] lg:w-[75%] p-5 flex flex-row gap-6'>
            <UpcomingAppointmentList />
            <PreviousAppointmentList />
        </div>
    )
}

export default AllAppointments