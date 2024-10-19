import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import useAuth from '../hooks/useAuth';
import AlertDisplay from '../components/AlertDisplay';
import room from '../assets/images/room.jpg';
import { AlertTriangle, Clock, DollarSign, Send, ShieldAlert, Star, TimerReset, User } from 'lucide-react';

const serverUrl = import.meta.env.VITE_DOCCURES_SERVER_URL;

const socket = io(serverUrl, { withCredentials: true });

function Emergency() {
    let { authData } = useAuth();
    let userId = authData?.user?.id;
    const [availableDoctors, setAvailableDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [emergencyRoom, setEmergencyRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    let [alertMessage, setAlert] = useState('');
    let [alertType, setAlertType] = useState('');
    const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
    const [show, setShow] = useState(true);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (userId) {
            socket.on('emergencyRequestSent', (request) => {
                console.log('Emergency request sent successfully:', request);
                setAlert('Emergency request sent successfully');
                setAlertType('success');
                setTimeout(() => {
                    setAlert('');
                }, 7000)
            });

            socket.on('emergencyDoctorsList', (doctors) => {
                console.log(doctors);
                if (doctors.message) {
                    alert(doctors.message);
                    setAlert(doctors.message);
                    setAlertType('warning');
                    setTimeout(() => {
                        setAlert('');
                    }, 7000)
                    console.log(doctors.message);

                }
                else {
                    setAvailableDoctors(doctors);
                    setAlert('We have found some doctors for you. Please select a doctor to proceed.');
                    setAlertType('success');
                    setTimeout(() => {
                        setAlert('');
                    }, 7000)
                }
            });


            socket.on('emergencyRequestResponse', (request) => {
                console.log('Received emergency request response:', request);
                if (request.user === userId && request.status === 'accepted') {
                    showNotification('DocCures Emergency Request', 'Your emergency request has been accepted.');
                    alert('Your emergency request has been accepted!');
                    setEmergencyRoom(`${request.room}`);
                    socket.emit('joinEmergencyRoom', `${request.room}`);
                } else {
                    alert('Your emergency request has been rejected. Please try another doctor.');
                    showNotification('DocCures Emergency Request', 'Your emergency request has been rejected. Please try another doctor.');
                }
            });

            socket.on('emergencyMessage', (message) => {
                console.log('Received emergency message:', message);
                setMessages(prev => [...prev, message]);
                if (message.sender !== 'user') {
                    showNotification('DoCures Emergency Message', message.message);
                }
            });
        }

        return () => {
            if (userId) {
                socket.off('emergencyRequestSent');
                socket.off('emergencyDoctorsList');
                socket.off('emergencyRequestResponse');
                socket.off('emergencyMessage');
            }
        };
    }, [userId]);


    const searchEmergencyDoctors = () => {
        socket.emit('searchEmergencyDoctors');
        if (windowWidth < 768 && availableDoctors.length > 0) {
            setShow(false);
        }
    };

    const sendEmergencyRequest = () => {
        if (selectedDoctor && userId) {
            socket.emit('sendEmergencyRequest', {
                userId: userId,
                doctorId: selectedDoctor._id
            });
        } else {
            console.error('Missing userId or selectedDoctor');
        }
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && emergencyRoom) {
            const messageData = {
                room: emergencyRoom,
                message: newMessage,
                sender: 'user'
            };
            socket.emit('emergencyMessage', messageData);
            console.log('Sent emergency message:', messageData);
            setNewMessage('');
        }
    };

    useEffect(() => {
        if (notificationPermission !== 'granted') {
            requestNotificationPermission();
        }
    }, []);

    const requestNotificationPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            setNotificationPermission(permission);
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    };

    const showNotification = (title, body) => {
        if (notificationPermission === 'granted') {
            new Notification(title, { body });
        }
    };

    return (
        <div className='lg:w-[80%] w-full h-[82vh] md:h-[73vh] p-4 flex flex-row items-center justify-center '>
            {
                alertMessage ?
                    <AlertDisplay alertMessage={alertMessage} alertType={alertType} />
                    :
                    null
            }
            {
                <AlertDisplay alertMessage="Please don't press back or refresh the page while conversation is going on! Chances of permanent connection loss" alertType='warning' />
            }
            <div className=' mt-16 w-full h-full bg-white rounded-3xl flex flex-col relative overflow-hidden shadow-md shadow-darkGray justify-around items-center'>
                <img src={room} className='absolute w-full h-full object-cover rounded-3xl opacity-55' />

                {
                    !emergencyRoom ? <>
                        {
                            show && !availableDoctors.length > 0 &&
                            <div className=' z-10 md:w-[60%] lg:w-auto h-full bg-transparent p-4 rounded-3xl flex flex-row items-center overflow-scroll no-scrollbar '>
                                <div className='bg-[#f6faff] rounded-3xl w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 shadow-lg shadow-[gray] overflow-y-auto no-scrollbar'>
                                    <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 sm:mt-5 text-center'>
                                        Emergency <span className='text-primary'>Assistance</span>
                                    </h1>

                                    <div className='w-full max-w-2xl mt-6 sm:mt-8 space-y-4 sm:space-y-6'>
                                        <div className='bg-white rounded-xl p-3 sm:p-4 shadow-md flex items-start space-x-3 sm:space-x-4'>
                                            <Clock className='text-primary flex-shrink-0 mt-[6px]' size={20} />
                                            <p className='text-base lg:text-lg xl:text-xl xl:font-semibold text-gray-700'>
                                                Our emergency assistance service is available 24/7. Please click the button below to search for emergency doctors.
                                            </p>
                                        </div>

                                        <div className='bg-white rounded-xl p-3 sm:p-4 shadow-md flex items-start space-x-3 sm:space-x-4'>
                                            <DollarSign className='text-primary flex-shrink-0 mt-[6px]' size={20} />
                                            <p className='text-base lg:text-lg xl:text-xl xl:font-semibold text-gray-700'>
                                                Emergency service doesn't charge any upfront fee. You can request assistance anytime, but you'll need to pay for the service after the consultation.
                                            </p>
                                        </div>

                                        <div className='bg-white rounded-xl p-3 sm:p-4 shadow-md flex items-start space-x-3 sm:space-x-4'>
                                            <AlertTriangle className='text-yellow-500 flex-shrink-0 mt-[6px]' size={20} />
                                            <p className='font-semibold text-base lg:text-lg xl:text-xl xl:font-bold text-gray-700'>
                                                Note! This is an emergency service and should only be used in case of an emergency.
                                            </p>
                                        </div>

                                        <div className='bg-red-50 rounded-xl p-3 sm:p-4 shadow-md flex items-start space-x-3 sm:space-x-4'>
                                            <ShieldAlert className='text-red-500 flex-shrink-0' size={20} />
                                            <p className='text-base lg:text-lg xl:text-xl xl:font-semibold  text-red-700'>
                                                If this is found not to be an emergency case, your account will be suspended and you will be charged the fees for doctor consultation on your next usage.
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        className='w-full sm:w-auto p-3 px-5 sm:px-7 text-base sm:text-xl font-semibold mt-6 sm:mt-10 rounded-2xl text-white bg-primary hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                                        onClick={searchEmergencyDoctors}
                                    >
                                        Search for Emergency Doctors
                                    </button>
                                </div>


                            </div>
                        }
                        {
                            availableDoctors.length > 0 && <div className='md:w-[40%] h-[90%] md:h-full bg-white z-10 bg-transparent p-4 rounded-3xl flex flex-col items-center overflow-scroll no-scrollbar'>
                                <div className='bg-[#f6faff]  h-full w-full flex flex-col p-3 sm:p-4 rounded-3xl shadow-md items-center overflow-scroll no-scrollbar'>
                                    {availableDoctors.length > 0 && (
                                        <div className="mt-6 w-full flex flex-col items-center">
                                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Available Doctors</h2>

                                            {availableDoctors.map((doctor) => (
                                                <button
                                                    key={doctor._id}
                                                    className='bg-white p-3 py-4 rounded-2xl shadow-md shadow-darkGray w-[100%] hover:shadow-[#babafc]'
                                                    onClick={() => setSelectedDoctor(doctor)}
                                                >
                                                    <div className='w-full flex flex-col '>
                                                        <div className='flex items-start'>
                                                            <div className='flex md:flex-col gap-2 '>
                                                                <img
                                                                    src={doctor.image}
                                                                    alt={`Dr. ${doctor.name}`}
                                                                    className='w-20 h-20 rounded-full object-cover border-2 border-primary'
                                                                />
                                                                <div className='flex flex-col items-start'>
                                                                    <p className='text-lg font-bold text-gray-800'>Dr. {doctor.name}</p>
                                                                    <p className='text-sm text-gray-600'>{doctor.speciality}</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='flex justify-between items-center text-sm'>
                                                            <span className='text-gray-600'>Experience: {doctor.experience || '5+ years'}</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}

                                        </div>
                                    )}

                                    {selectedDoctor && (
                                        <div className="mt-6 flex flex-col justify-center items-center w-full gap-2">
                                            <p className='text-textp text-sm lg:text-base'>Request Emergency Assistance from <span className='text-primary font-semibold'>{selectedDoctor.name}</span> ?</p>
                                            <button
                                                className='p-3 px-7 lg:text-xl font-semibold rounded-2xl text-white bg-primary hover:bg-blue-800 w-full transition-colors duration-200 shadow-md hover:shadow-lg text-sm'
                                                onClick={sendEmergencyRequest}
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                    </>
                        :
                        <div className='h-full w-full bg-transaparent flex items-center justify-center z-10 p-3 py-7 '>
                            <div className='max-w-[800px] md:w-[80%] h-full bg-white rounded-3xl p-4 flex justify-center overflow-scroll no-scrollbar'>
                                <div className="mt-8 w-full h-full flex flex-col items-center">
                                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Emergency Chat</h2>
                                    <div className="w-full h-[70%]">
                                        <div className="mb-4 h-full overflow-y-auto space-y-4  overflow-scroll no-scrollbar">
                                            {messages.map((msg, index) => (
                                                <div
                                                    key={index}
                                                    className={`p-2 rounded-lg ${msg.sender === 'user'
                                                        ? 'bg-blue-100 text-blue-800 ml-auto rounded-br-none'
                                                        : 'bg-green-100 text-green-700 rounded-bl-none'
                                                        } max-w-[80%] break-words`}
                                                >
                                                    <p className="text-sm font-semibold mb-1">
                                                        {msg.sender === 'user' ? 'You' : 'Doctor'}:
                                                    </p>
                                                    <p>{msg.message}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <form onSubmit={sendMessage} className="flex items-center">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                className="w-[190px] md:w-auto flex-grow p-2 border rounded-l-lg focus:outline-none outline-none hover:border-primary"
                                                placeholder="Type your message..."
                                            />
                                            <button
                                                type="submit"
                                                className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors duration-200 flex items-center"
                                            >
                                                <Send size={18} className="mr-2" />
                                                Send
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                }
                {notificationPermission !== 'granted' && (
                    <button
                        className="bg-blue-500 z-10 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-600 transition-colors duration-200 mt-10"
                        onClick={requestNotificationPermission}
                    >
                        Enable Notifications
                    </button>
                )}

            </div>
        </div>
    );
}

export default Emergency;