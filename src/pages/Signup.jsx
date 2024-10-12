import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormInput from '../components/FormInput';
import FormImageInput from '../components/FormImageInput';
import IncomponentLoading from '../components/IncomponentLoading';
import AlertDisplay from '../components/AlertDisplay';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';

function Signup() {
    const serverUrl = import.meta.env.VITE_DOCCURES_SERVER_URL;
    const navigate = useNavigate();
    const { isLoading: authLoader, error: authError } = useAuth();
    const { isAuthenticated } = useSelector(state => state.user);

    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const initialUserState = {
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        image: null
    };

    const [user, setUser] = useState(initialUserState);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setUser(prevUser => ({ ...prevUser, image: file }));
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(user).forEach(key => {
            if (key === 'image') {
                formData.append('image', user.image);
            } else {
                formData.append(key, user[key]);
            }
        });

        try {
            setIsLoading(true);
            const response = await fetch(`${serverUrl}/user/signup`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
            const data = await response.json();

            if (!data.isSaved) {
                setError(data.message);
                setShowWarning(true);
                setTimeout(() => setShowWarning(false), 17000);
            } else {
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    navigate('/login');
                }, 7000);
                setUser(initialUserState);
                setPreviewImage(null);
            }
        } catch (error) {
            console.error('Error adding user:', error);
            setError('An unexpected error occurred. Please try again.');
            setShowWarning(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (authLoader) {
        return <Loading />;
    }

    if (authError) {
        return <AlertDisplay alertType="error" alertMessage={authError} />;
    }

    return (
        <div className='h-screen flex flex-col items-center justify-center w-full'>
            <h1 className='text-3xl lg:text-4xl font-bold'>
                Welcome to <span className='text-primary'>DocCures</span>
            </h1>
            <p className='text-textp'>Your Trusted Healthcare Companion</p>
            {showWarning && <AlertDisplay alertType='error' alertMessage={error} />}
            {showSuccess && (
                <AlertDisplay 
                    alertType='success' 
                    alertMessage='User Registered successfully, now please Login to continue using the services' 
                />
            )}
            <div className='w-[80%] max-w-[900px] h-auto mt-10 overflow-scroll no-scrollbar'>
                <form 
                    className='w-full h-auto bg-white rounded-3xl flex flex-col items-start p-6 px-9 shadow-md shadow-darkGray gap-7 mb-4'
                    onSubmit={handleSubmit}
                >
                    <div className='w-full h-auto flex flex-col gap-7'>
                        <FormInput
                            title='Name'
                            type='text'
                            placeholder='Enter your Name'
                            labelFor='name'
                            isRequired={true}
                            value={user.name}
                            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <FormInput
                            title='Email'
                            type='email'
                            placeholder='Enter your Email'
                            labelFor='email'
                            isRequired={true}
                            value={user.email}
                            onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                        />
                        <FormInput
                            title='Phone number'
                            type='tel'
                            placeholder='Enter your Phone number'
                            labelFor='phone'
                            isRequired={true}
                            value={user.phone}
                            onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))}
                        />
                        <FormInput
                            title='Password'
                            type='password'
                            placeholder='Password'
                            labelFor='password'
                            isRequired={true}
                            value={user.password}
                            onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <FormInput
                            title='Address'
                            type='text'
                            placeholder='Enter your current address'
                            labelFor='address'
                            isRequired={true}
                            value={user.address}
                            onChange={(e) => setUser(prev => ({ ...prev, address: e.target.value }))}
                        />
                        <FormImageInput
                            title='User Profile Avatar'
                            labelFor='profilePic'
                            isRequired={false}
                            onChange={handleImageChange}
                            previewImage={previewImage}
                        />
                    </div>
                    <button 
                        className='p-3 w-full rounded-2xl text-2xl font-bold text-white bg-primary hover:bg-[#0000ffc0] hover:shadow-md hover:shadow-[#5c6e9e]'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? <IncomponentLoading isShort={true} /> : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;