import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RandomColorGenerator from '../utils/RandomColorGenerator.mjs';
import FormInput from '../components/FormInput';
import FormImageInput from '../components/FormImageInput';
import IncomponentLoading from '../components/IncomponentLoading';
import ProfilePreview from '../components/ProfilePreview';
import AlertDisplay from '../components/AlertDisplay';
import { updateUser } from '../reduxSlices/UserSlice.mjs';
import { useNavigate } from 'react-router-dom';


function EditProfile() {
    const { name, email, phone, address, image } = useSelector(state => state.user);
    const serverUrl = import.meta.env.VITE_DOCCURES_SERVER_URL;
    let [isLoading, setIsLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(image);
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState('');
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const initialUserState = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        image: image
    };


    const [user, setUser] = useState(initialUserState);
    let color = RandomColorGenerator();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(user).forEach(key => {
            if (key === 'image' && user[key] instanceof File) {
                formData.append('image', user[key]);
            } else {
                formData.append(key, user[key]);
            }
        });

        console.log(formData);
         
    
        try {
            setIsLoading(true);
            const response = await fetch(`${serverUrl}/user/update`, {
                method: 'PUT',
                body: formData,
                credentials: 'include'
            });
            const data = await response.json();

            if (!data.isUpdated) {
                setError(data.message);
                setShowWarning(true);
                setTimeout(() => setShowWarning(false), 17000);
            } else {
                setShowSuccess(true);
                console.log(data.user);
                dispatch(updateUser(data));
                setTimeout(() => {
                    setShowSuccess(false);
                    navigate('/profile');
                }, 7000);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setError('An unexpected error occurred. Please try again.');
            setShowWarning(true);
        } finally {
            setIsLoading(false);
        }
    };

    let handleImageChange = (e) => {
        const file = e.target.files[0];
        setUser(prevUser => ({ ...prevUser, image: file }));
        setPreviewImage(URL.createObjectURL(file));
    }

    return (
        <div className='w-[95%] lg:w-[80%] py-5'>
            <div className='w-full py-6 px-4 shadow-md shadow-darkGray mt-5 bg-white rounded-2xl flex flex-col items-center gap-5 pb-12'>
                {showWarning && <AlertDisplay alertType='error' alertMessage={error} />}
                {showSuccess && (
                    <AlertDisplay
                        alertType='success'
                        alertMessage='User updated successfully'
                    />
                )}
                <ProfilePreview
                    name={user.name}
                    email={user.email}
                    phone={user.phone}
                    address={user.address}
                    isLocalImage={true}
                    previewImage={user.image}
                    color={color}
                />
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
                                placeholder='Enter new email'
                                labelFor='email'
                                isRequired={true}
                                value={user.email}
                                onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
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
                            {isLoading ? <IncomponentLoading isShort={true} /> : 'Update Profile'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile