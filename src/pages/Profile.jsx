import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Mail, Phone, MapPinCheck, Edit, LogOut, Trash } from 'lucide-react';
import Verified from '../assets/images/verified.png';
import { appointments } from '../constants/appointments.mjs';
import AppointmentList from '../components/AppointmentList';
import ConfirmAlert from '../components/ConfirmAlert';
import { logoutUser } from "../reduxSlices/UserSlice.mjs";
import Loading from '../components/Loading';

function Profile() {
    const { name, email, phone, address, image } = useSelector(state => state.user);
    const serverUrl = import.meta.env.VITE_DOCCURES_SERVER_URL;
    const appointment = appointments;
    const dispatch = useDispatch();
    let [isLoading, setIsLoading] = useState(false);


    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    function RandomColorGenerator() {
        let color = ''

        for (let i = 0; i < 3; i++) {
            let sub = Math.floor(Math.random() * 256).toString(16)
            color += (sub.length === 1 ? '0' + sub : sub)
        }
        console.log(color);

        return color
    }

    let color = RandomColorGenerator();

    const handleLogoutConfirm = async (confirmed) => {
        if (confirmed) {
            try {
                setIsLoading(true);
                const response = await fetch(`${serverUrl}/logout`, {
                    method: 'POST',
                    credentials: 'include'
                });
                if (response.ok) {
                    dispatch(logoutUser());
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error during logout:', error);
            }
            finally {
                setIsLoading(false);
            }
        }
        setShowLogoutConfirm(false);
    };
    console.log(image);

    const handleDeleteConfirm = async (confirmed) => {
        if (confirmed) {
            try {
                const response = await fetch(`${serverUrl}/delete-account`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                if (response.ok) {
                    dispatch(logoutUser()); // Assuming this also clears user data
                    // Redirect to home page or show a message
                } else {
                    console.error('Account deletion failed');
                }
            } catch (error) {
                console.error('Error during account deletion:', error);
            }
        }
        setShowDeleteConfirm(false);
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className='w-[95%] lg:w-[80%] py-5'>
            <div className='w-full py-6 px-4 shadow-md shadow-darkGray mt-5 bg-white rounded-2xl flex flex-col items-center gap-5 pb-12'>
                {showLogoutConfirm && (
                    <ConfirmAlert
                        confirmMessage='Are you sure you want to logout?'
                        confirmType='warning'
                        confirm={handleLogoutConfirm}
                    />
                )}
                {showDeleteConfirm && (
                    <ConfirmAlert
                        confirmMessage='Are you sure you want to delete your account? This action cannot be undone.'
                        confirmType='warning'
                        confirm={handleDeleteConfirm}
                    />
                )}
                <div className='flex flex-row gap-7 items-center'>
                    <div className='p-1 border-4 border-primary rounded-full relative'>
                        <div className='w-[150px] h-[150px] flex flex-col rounded-full overflow-hidden items-center justify-center'>
                            {
                                image === "null" ?
                                    <div className="w-full h-[150px] bg-white flex justify-center items-center">
                                        <div
                                            className=' opacity-45'
                                            style={{
                                                backgroundColor: `#${color}`,
                                                width: '150px',
                                                height: '150px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                        </div>
                                        <p className='absolute text-3xl font-semibold'>
                                            {name[0].toUpperCase()}
                                        </p>
                                    </div>
                                    :
                                    (
                                        <img
                                            src={image}
                                            alt={`Dr. ${name}`}
                                            className="w-[97%] h-52 object-cover object-top rounded-2xl"
                                        />
                                    )
                            }
                        </div>
                        <img src={Verified} className='bg-white p-1 rounded-full w-[45px] absolute bottom-0 right-0' alt="Verified" />
                    </div>
                    <div className='flex flex-col items-start gap-3'>
                        <h1 className='text-[33px] font-semibold flex flex-row gap-2'>
                            Welcome,
                            <span className='text-primary font-bold'>
                                {name}
                            </span>
                        </h1>
                        <div className='flex flex-row items-center gap-2'>
                            <Phone className='w-[22px] h-[22px]' />
                            <p className='text-xl font-semibold text-primary'>{phone}</p>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <Mail className='w-[22px] h-[22px]' />
                            <p className='text-xl font-semibold text-primary'>{email}</p>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <MapPinCheck className='w-[22px] h-[22px]' />
                            <p className='text-xl font-semibold text-primary'>{address}</p>
                        </div>
                    </div>
                </div>
                <hr className='w-[95%] border-none h-[2px] bg-darkGray mt-5' />
                <div className='mt-6 w-[95%] flex flex-col items-center'>
                    <h2 className='text-2xl font-semibold'>Your Appointments</h2>
                    <AppointmentList appointment={appointment} />
                </div>
                <div className='w-[95%] py-6 px-3 bg-secondary rounded-2xl shadow-md shadow-darkGray flex flex-row justify-around gap-3'>
                    <button className='px-5 p-3 flex flex-row items-center gap-2 bg-primary rounded-xl w-[200px] justify-center text-white text-lg font-semibold hover:bg-[#2929ff]'>
                        Edit Profile
                        <Edit className='w-6' />
                    </button>
                    <button
                        className='px-5 p-3 flex flex-row items-center gap-2 bg-[#4d4d4d] rounded-xl w-[200px] justify-center text-white text-lg font-semibold hover:bg-[#2e2e2e]'
                        onClick={() => setShowLogoutConfirm(true)}
                    >
                        Logout
                        <LogOut className='w-6' />
                    </button>
                    <button
                        className='px-5 p-3 flex flex-row items-center gap-2 bg-[#ec3333] rounded-xl w-[200px] justify-center text-white text-lg font-semibold hover:bg-[red]'
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        Delete Account
                        <Trash className='w-6' />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;