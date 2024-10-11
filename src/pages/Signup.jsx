import React, { useState, useEffect } from 'react'
import FormInput from '../components/FormInput';
import FormImageInput from '../components/FormImageInput.jsx'
import IncomponentLoading from '../components/IncomponentLoading';
import AlertDisplay from '../components/AlertDisplay';
import { useNavigate } from 'react-router-dom';

function Signup() {

    const serverUrl = import.meta.env.VITE_DOCCURES_SERVER_URL;

    let [showWarning, setShowWarning] = useState(false)
    let [showSuccess, setShowSuccess] = useState(false)
    let [error, setError] = useState('')

    let [isLoading, setIsLoading] = useState(false)

    const initialUserState = {
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        image: null
    };

    const [user, setUser] = useState(initialUserState);

    const [previewImage, setPreviewImage] = useState(null);
    let navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUser({ ...user, image: file });
        setPreviewImage(URL.createObjectURL(file));
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(user).forEach(key => {
            if (key === 'image') {
                formData.append('image', user.image);
            } else {
                formData.append(key, user[key]);
            }
        });

        console.log(formData);

        try {
            setIsLoading(true);
            const response = await fetch(`${serverUrl}/user/signup`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            let data = await response.json();
            console.log(data);

            if (!data.isSaved) {
                console.log(data.isSaved);
                setError(data.message)
                setShowWarning(true)
                setTimeout(() => {
                    setShowWarning(false)
                }, 17000)
            }
            else if (data.isSaved) {
                setShowSuccess(true)
                setTimeout(() => {
                    setShowSuccess(false)
                    navigate('/login')
                }, 7000)
                setUser(initialUserState);
                setPreviewImage(null);
            }

        } catch (error) {
            console.error('Error adding user:', error);
        }
        finally {
            setIsLoading(false)
        }
    }


    return (
        <div className='h-screen flex flex-col items-center justify-center w-full'>
            <h1 className=' text-3xl  lg:text-4xl font-bold'>
                {
                    showWarning ?
                        <AlertDisplay alertType='error' alertMessage={error} />
                        :
                        null
                }
                {
                    showSuccess ?
                        <AlertDisplay alertType='success' alertMessage='User Registered successfully, now please Login to continue using the services' />
                        :
                        null
                }
                Welcome to <span className='text-primary'>DocCures</span></h1>
            <p className='text-textp '>Your Trusted Healthcare Companion</p>
            <div className='w-[80%] max-w-[900px] h-auto mt-10 overflow-scroll no-scrollbar'>
                <form className='w-full h-auto bg-white rounded-3xl flex flex-col items-start p-6 px-9 shadow-md shadow-darkGray gap-7 mb-4'
                    onSubmit={handleSubmit}
                >
                    <div className='w-full h-auto flex flex-col  gap-7'>
                        <FormInput
                            title={'Name'}
                            type={'text'}
                            placeholder={'Enter your Name'}
                            labelFor={'name'}
                            isRequired={true}
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                        <FormInput
                            title={'Email'}
                            type={'email'}
                            placeholder={'Enter your Email'}
                            labelFor={'email'}
                            isRequired={true}
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <FormInput
                            title={'Phone number'}
                            type={'number'}
                            placeholder={'Enter your Phone number'}
                            labelFor={'phone'}
                            isRequired={true}
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                        />
                        <FormInput
                            title={'Password'}
                            type={'password'}
                            placeholder={'Password'}
                            labelFor={'password'}
                            isRequired={true}
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <FormInput
                            title={'Address'}
                            type={'text'}
                            placeholder={`Enter your current address`}
                            labelFor={'address'}
                            isRequired={true}
                            value={user.address}
                            onChange={(e) => setUser({ ...user, address: e.target.value })}
                        />
                        <FormImageInput
                            title={'User Profile Avatar'}
                            labelFor={'prifilePic'}
                            isRequired={false}
                            onChange={handleImageChange}
                            previewImage={previewImage}
                        />
                    </div>
                    {
                        isLoading ?
                            <button className='p-3 w-full rounded-2xl text-2xl font-bold text-white bg-[#0000ffc0] hover:shadow-md hover:shadow-[#5c6e9e]'
                                type='submit'
                            >
                                <IncomponentLoading isShort={true} />
                            </button>
                            :
                            <button className='p-3 bg-primary w-full rounded-2xl text-2xl font-bold text-white hover:bg-[#0000ffc0] hover:shadow-md hover:shadow-[#5c6e9e]'
                                type='submit'
                            >
                                Sign Up
                            </button>
                    }
                </form>
            </div>
        </div>
    )
}

export default Signup