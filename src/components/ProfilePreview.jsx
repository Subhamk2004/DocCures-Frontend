import React from 'react'
import { Mail, Phone, MapPinCheck, Edit, LogOut, Trash } from 'lucide-react';
import Verified from '../assets/images/verified.png';

function ProfilePreview({
    name,
    email,
    phone,
    address,
    image,
    color,
    isLocalImage = false,
    previewImage,
}) {
    let imageUrl = previewImage;
    if (isLocalImage && typeof previewImage !== 'string') {
        imageUrl = URL.createObjectURL(previewImage);
    }

    return (
        <div className='flex flex-row gap-7 items-center'>
            <div className='p-1 border-4 border-primary rounded-full relative'>
                <div className='w-[150px] h-[150px] flex flex-col rounded-full overflow-hidden items-center justify-center'>
                    {
                        isLocalImage ?
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="w-[100%] h-52 object-cover object-top rounded-2xl"
                            />
                            :
                            <>
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
                                                className="w-[100%] h-52 object-cover object-top rounded-2xl"
                                            />
                                        )
                                }
                            </>
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
    )
}

export default ProfilePreview