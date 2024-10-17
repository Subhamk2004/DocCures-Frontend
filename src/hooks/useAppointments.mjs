import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAppointments } from "../reduxSlices/AppointmentSlice.mjs";

const serverUrl = import.meta.env.VITE_DOCCURES_SERVER_URL;

let useAppointments = () => {
    let { email } = useSelector(state => state.user)
    let [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let dispatch = useDispatch();


    let fetchAppointments = async () => {
        try {
            setIsLoading(true);
            let response = await fetch(`${serverUrl}/user/getAppointments?email=${encodeURIComponent(email)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            let data = await response.json();
            setAppointments(data.appointments);

            if (data.appointmentsFound) {
                dispatch(addAppointments(data.appointments));
                console.log('Appointments:', data.appointments);

            }
        } catch (error) {
            console.error('Error in authStatus:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    return { appointments, isLoading, error };
}

export default useAppointments;