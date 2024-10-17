import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import RandomColorGenerator from '../utils/RandomColorGenerator.mjs';
import ProfilePreview from '../components/ProfilePreview';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import AlertDisplay from '../components/AlertDisplay';
import IncomponentLoading from '../components/IncomponentLoading';
import ConfirmAlert from '../components/ConfirmAlert';
import { useNavigate } from 'react-router-dom';


function BookAppointment({ user: fetchedUser }) {

    let { isAuthenticated, email, phone, image, name } = useSelector(state => state.user);
    const serverUrl = import.meta.env.VITE_DOCCURES_SERVER_URL;
    let color = RandomColorGenerator();
    if (!fetchedUser.fees) {
        fetchedUser.fees = 5000;
    }

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState();
    const [errorType, setErrorType] = useState('error');
    const [isLoading, setIsLoading] = useState(false);
    const [showBookConfirm, setShowBookConfirm] = useState(false);
    const [paid, setPaid] = useState(false);
    const navigate = useNavigate();

    const BookingData = {
        patientName: name,
        patientEmail: email,
        patientPhone: phone,
        address: fetchedUser.address,
        patientImage: image,
        doctorImage: fetchedUser.image,
        doctorName: fetchedUser.name,
        doctorEmail: fetchedUser.email,
        doctorSpecialisation: fetchedUser.speciality,
        date: selectedDate,
        time: selectedTime,
        fee: fetchedUser.fees,
        isCompleted: false,
        isCancelled: false,
        isPaid: paid,
    };

    let handleBooking = async (confirmed) => {
        if (confirmed) {
            if (!isAuthenticated) {
                setError('Please login to book an appointment');
                setErrorType('warning');
                setTimeout(() => {
                    setError(false);
                }, 7000)
                setShowBookConfirm(false);
                return;
            }
            if (fetchedUser.available === false) {
                setError('Doctor is not available for booking, please chosse another doctor');
                setErrorType('warning');
                setTimeout(() => {
                    setError(false);
                }, 7000)
                setShowBookConfirm(false);
                return;
            }
            setShowBookConfirm(false);
            try {
                setIsLoading(true);
                const response = await fetch(`${serverUrl}/appointment/booking`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(BookingData),
                });
                const data = await response.json();

                if (!data.isSaved) {
                    setError(data.message);
                    setErrorType('error')
                    setTimeout(() => setError(false), 12000);
                } else {
                    setError('Appointment booked successfully');
                    setErrorType('success');
                    setTimeout(() => {
                        setError(false);
                        navigate('/allAppointments')
                    }, 7000);
                }

            } catch (error) {
                console.error('Error adding user:', error);
                setError('An unexpected error occurred. Please try again.');
                setShowWarning(true);
            }
            finally {
                setIsLoading(false);
            }
        }
        else {
            setShowBookConfirm(false);
        }

    }

    const generateTimeSlots = () => {
        const slots = [];
        for (let i = 10; i < 16; i++) {
            slots.push(`${i}:00`);
            slots.push(`${i}:30`);
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <div className='w-full flex flex-col items-center justify-center'>
                {showBookConfirm && (
                    <ConfirmAlert
                        confirmMessage='Confirm Booking?'
                        confirmType='warning'
                        confirm={handleBooking}
                    />
                )}
                {
                    error && <AlertDisplay alertType={errorType} alertMessage={error} />
                }
                <ProfilePreview
                    name={fetchedUser.name}
                    email={fetchedUser.email}
                    phone={fetchedUser.phone}
                    address={fetchedUser.address}
                    isLocalImage={false}
                    image={fetchedUser.image}
                    color={color}
                    degree={fetchedUser.degree}
                    speciality={fetchedUser.speciality}
                    experience={fetchedUser.xp}
                    available={fetchedUser.available}
                    fees={fetchedUser.fees}
                />
            </div>
            <hr className='w-[95%] border-none h-[2px] bg-darkGray mt-12' />
            <div className="w-[85%] flex flex-col justify-center items-center mb-5 mt-10 h-[30%]">
                <h2 className="text-2xl font-bold mb-4 text-textp ">Appointment Booking</h2>
                <div className="flex flex-col gap-6 mt-5 items-center">
                    <div className="flex flex-col items-start">
                        <h3 className="text-lg font-semibold mb-2 text-textp">Select Date</h3>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            minDate={new Date()}
                            className="p-2 border rounded-xl outline-none border-primary text-textp"
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <h3 className="text-lg font-semibold mb-2 text-textp">Select Time</h3>
                        <div className="flex flex-row gap-3 flex-wrap">
                            {timeSlots.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => handleTimeSelection(time)}
                                    className={`p-3 px-6 rounded-2xl ${selectedTime === time
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-200 hover:bg-white hover:shadow-md hover:shadow-darkGray hover:border hover:border-primary'
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <hr className='w-[95%] border-none h-[2px] bg-darkGray mt-12' />
                {selectedDate && selectedTime && (
                    <div className="mt-8 text-center flex flex-col gap-2 items-center">
                        <p className="font-semibold text-textp">
                            Selected Appointment: {selectedDate.toDateString()} at {selectedTime}
                        </p>
                        <button className="mt-2 bg-primary text-white px-7 py-3 rounded-2xl hover:bg-[#4545f8]"
                            onClick={() => setShowBookConfirm(true)}
                            disabled={isLoading}
                        >
                            {isLoading ? <IncomponentLoading isShort={true} /> : 'Book Appointment'}
                        </button>

                        <label className='gap-2 flex flex-row'>
                            <input type="checkbox" checked={paid} onChange={(e) => setPaid(e.target.checked)} />
                            <span className="text-textp font-semibold">Pay now</span>
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookAppointment;