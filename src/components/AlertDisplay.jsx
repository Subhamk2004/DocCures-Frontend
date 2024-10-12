import React, { useRef, useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import serverError from '../assets/animations/serverError.webm'
import warning from '../assets/images/warning.png'
import close from '../assets/images/close.png'
import success from '../assets/animations/success.webm'
import warningAnime from '../assets/animations/warning.webm'
import { useSelector } from 'react-redux'

function AlertDisplay({
    alertMessage = 'Something went wrong, try refreshing the page', alertType = 'error', displayAlert = false
}) {
    const { error } = useAuth();

    let startStyle = 'transition-all h-full w-[5px]';
    let stopStyle = 'transition-all duration-[4500ms] ease-in w-[5px] h-[0px]'
    let alertBoxShowStyle = ' transition-all  border   rounded-xl relative flex flex-row overflow-hidden w-full h-full visible h-[86px]'
    let alertBoxHideStyle = 'transition-all delay-[4500ms] duration-[1500ms] ease-in-out w-0  border rounded-xl relative flex flex-row overflow-hidden border-0 h-[86px]'
    let [alertIndicator, setAlertIndicator] = useState(alertType);
    let [style, setStyle] = useState(startStyle);
    let [alertStyle, setAlertStyle] = useState(alertBoxShowStyle);
    const videoRef = useRef(null);

    useEffect(() => {
        
        setAlertStyle(alertBoxShowStyle)
        setStyle(startStyle);
        setAlertIndicator(alertType)
        if (alertType !== 'error') {
            setTimeout(() => {
                setAlertStyle(alertBoxHideStyle)
                setStyle(stopStyle);
                setTimeout(() => {
                    setAlertIndicator('');
                    console.log('Inside the inner hey');
                }, 7000)
            }, 500)
        }
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.5;
        }
        console.log('Hey');
    }, [alertType, displayAlert])



    if (error) {
        return (
            <div className='w-screen h-screen fixed z-20 inset-0 bg-white flex flex-col items-center justify-center gap-5'>
                <h1 className='text-4xl font-extrabold text-textp flex flex-row gap-2'>
                    Sorry <span className='text-[#ec174d]'> Error </span>  from the Server  Side !!!!
                </h1>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{}}>
                    <source src={serverError} type="video/webm" />
                    Your browser does not support the video tag.
                </video>
                <div className='flex flex-row gap-1 items-center'>
                    <img src={warning} className='w-[25px] h-[25px]' />
                    <p className='text-textp'>Try again after sometime</p>
                </div>
            </div>
        )
    }
    return (
        <div className='p-3  flex flex-row justify-center fixed z-30'>
            {
                alertIndicator === "success" ?
                    <div className='min-w-[250px] flex flex-col max-w-[350px] relative '>
                        <div className={`${alertStyle} bg-green-100 border-green-400 text-green-700`} role='alert'>
                            <div className={`${style} bg-green-400`}></div>
                            <div className='px-4 py-3 flex flex-col'>
                                <div className='flex flex-row items-center'>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        style={{ width: '35px' }}>
                                        <source src={success} type="video/webm" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <strong className='font-bold'>Success!</strong>
                                </div>
                                <span className='block text-lg sm:inline'>{alertMessage}</span>
                            </div>
                            <button onClick={(e) => {
                                setAlertIndicator('');
                                console.log(alertIndicator);
                            }}
                                className='absolute top-[6px] right-[6px] bg-[#7fe66a57] hover:bg-[#6ec75c93] rounded-full p-[6px]'
                            >
                                <img src={close} className='w-[8px]' />
                            </button>
                        </div>
                    </div> :
                    null
            }
            {
                alertIndicator === "warning" ?
                    <div className='min-w-[250px] flex flex-col max-w-[350px] relative '>
                        <div className={`${alertStyle} bg-yellow-100 border-yellow-400 text-yellow-700`} role='alert'>
                            <div className={`${style} bg-yellow-400`}></div>
                            <div className='px-4 py-3 flex flex-col'>
                                <div className='flex flex-row items-center gap-1'>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        style={{ width: '30px' }}>
                                        <source src={warningAnime} type="video/webm" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <strong className='font-bold'>Warning!</strong>
                                </div>
                                <span className='block text-lg sm:inline'>{alertMessage}</span>
                            </div>
                            <button onClick={(e) => {
                                setAlertIndicator('');
                                console.log(alertIndicator);
                            }}
                                className='absolute top-[6px] right-[6px] bg-[#e6c56a57] hover:bg-[#c7c05c93] rounded-full p-[6px]'
                            >
                                <img src={close} className='w-[8px]' />
                            </button>
                        </div>
                    </div> :
                    null
            }
            {
                alertIndicator === "error" ?
                    <div className='min-w-[250px] flex flex-col max-w-[350px] relative '>
                        <div className={`${alertStyle} bg-red-100 border-red-400 text-red-700`} role='alert'>
                            <div className={`${style} bg-red-400`}></div>
                            <div className='px-4 py-3 flex flex-col'>
                                <div className='flex flex-row items-center'>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        style={{ width: '35px' }}>
                                        <source src={serverError} type="video/webm" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <strong className='font-bold'>Error!</strong>
                                </div>
                                <span className='block text-lg sm:inline'>{alertMessage}</span>
                            </div>
                            <button onClick={(e) => {
                                setAlertIndicator('');
                                console.log(alertIndicator);
                            }}
                                className='absolute top-[6px] right-[6px] bg-[#e66a6a57] hover:bg-[#c75c5c93] rounded-full p-[6px]'
                            >
                                <img src={close} className='w-[8px]' />
                            </button>
                        </div>
                    </div> :
                    null
            }
        </div>
    )
}

export default AlertDisplay