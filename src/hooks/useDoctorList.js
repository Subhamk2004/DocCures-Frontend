import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const server_url = import.meta.env.VITE_DOCCURES_SERVER_URL;

export default function useDoctorList() {

    let [doctorList, setDoctorList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    let fetchDoctorList = async () => {
        setIsLoading(true);
        const response = await fetch(`${server_url}/admin/doctor/allDoctors`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data) {
            if (!data.doctorsFound) {
                console.error(data.message);

            }
        }
        setDoctorList(data.doctors);
        setIsLoading(false);
        return data.doctors;
    }

    useEffect(() => {
        fetchDoctorList();
    }, []);

    return { doctorList, isLoading, error };
}
