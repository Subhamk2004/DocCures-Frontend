import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useSingleUser from '../hooks/useSingleUser.mjs';
import BookAppointment from './BookAppointment.jsx';
import { useLocation } from 'react-router-dom';


function LoadDoctor() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    
    const userType = searchParams.get('userType');

    const { id } = useParams();
    const { user: fetchedUser, isLoadingUsers } = useSingleUser(id, userType);
    let [user, setUser] = useState();

    useEffect(() => {
        console.log(fetchedUser);
        if(fetchedUser) {
            setUser(fetchedUser);
        }
    }, [fetchedUser])

    return (
        <div className='w-[95%] lg:w-[80%] py-5'>
            <div className='w-full py-6 px-4 shadow-md shadow-darkGray mt-5 bg-white rounded-2xl flex flex-col items-center gap-5 pb-12'>
                {
                    user && 
                    <BookAppointment user={user} />
                }
            </div>
        </div>
    )
}

export default LoadDoctor