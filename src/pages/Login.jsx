import React, { useState, useEffect } from 'react'
import FormInput from '../components/FormInput';
import IncomponentLoading from '../components/IncomponentLoading';
import AlertDisplay from '../components/AlertDisplay';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';


function Login() {
    const serverUrl = import.meta.env.VITE_DOCCURES_SERVER_URL;

    let [showWarning, setShowWarning] = useState(false)
    let [showSuccess, setShowSuccess] = useState(false)
    let [showError, setShowError] = useState(false)
    let [error, setError] = useState('')

    let [isLoading, setIsLoading] = useState(false)
    let [data, setData] = useState()
    const { isLoading: authLoader, error: authError } = useAuth();

    let navigate = useNavigate();

    const initialUserState = {
        email: '',
        password: '',
    };

    const [user, setUser] = useState(initialUserState);

    let handleSubmit = async (e) => {
        e.preventDefault();

        console.log('request sent');
        e.preventDefault();
        try {
            setIsLoading(true)
            let response = await fetch(`${serverUrl}/loginuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: `${user.email}`,
                    password: `${user.password}`,
                }),
                credentials: 'include'
            })
            let newData = await response.json();
            setData(newData);
            console.log(newData);

            if(newData.auth){
                setShowSuccess(true)
                setTimeout(() => {
                    navigate('/')
                    setShowSuccess(false)
                }, 7000)
            }
            else {
                setShowError(true)
                setError(newData.message)
                setTimeout(() => {
                    setShowError(false)
                },12000)
            }

        } catch (error) {
            console.error('Error adding user:', error);
        }
        finally {
            setIsLoading(false)
        }


    }

    useEffect(() => {
        setShowWarning(true)
        setTimeout(() => {
            setShowWarning(false)
        }, 8000)
    }, [])

    if (authLoader) {
        return <Loading />;
    }

    if (authError) {
        return <AlertDisplay alertType="error" alertMessage={authError} />;
    }

    return (
        <div className='h-[80vh] md:h-screen flex flex-col items-center justify-center w-full'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>
                {
                    showWarning ?
                        <AlertDisplay alertType='warning' alertMessage="Please Login to continue using the services" />
                        :
                        null
                }
                {
                    showError ?
                        <AlertDisplay alertType='error' alertMessage={error} />
                        :
                        null
                }
                {
                    showSuccess ?
                        <AlertDisplay alertType='success' alertMessage='Login successful' />
                        :
                        null
                }
                Welcome to <span className='text-primary'>DocCures</span></h1>
            <p className='text-textp text-sm md:text-base'>Your Trusted Healthcare Companion</p>
            <div className='w-[93%] md:w-[80%] max-w-[900px] h-auto mt-10 overflow-scroll no-scrollbar'>
                <form className='w-full h-auto bg-white rounded-3xl flex flex-col items-start p-6 px-9 shadow-md shadow-darkGray gap-7 mb-4'
                    onSubmit={handleSubmit}
                >
                    <div className='w-full h-auto flex flex-col  gap-7'>
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
                            title={'Password'}
                            type={'password'}
                            placeholder={'Password'}
                            labelFor={'password'}
                            isRequired={true}
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                            <button className='p-3 bg-primary w-full rounded-2xl text-xl md:text-2xl font-bold text-white hover:bg-[#0000ffc0] hover:shadow-md hover:shadow-[#5c6e9e]'
                                type='submit'
                            >
                                Login
                            </button>
                    }
                </form>
            </div>
        </div>
    )
}

export default Login