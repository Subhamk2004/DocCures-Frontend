import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

const server_url = import.meta.env.VITE_DOCCURES_SERVER_URL;

export default function useSingleUser(id, userType) {

    userType = 'doctor';

    let [user, setUser] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [error, setError] = useState(null);
    console.log(id);
    
    let fetchUsers = async () => {
        setIsLoadingUsers(true);
        const response = await fetch(`${server_url}/user/getOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                userType: userType
            }),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data) {
            if (!data.userFound) {
                console.error(data.message);
            }
        }
        setUser(data.user);
        setIsLoadingUsers(false);
        return data.user;
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return { user, isLoadingUsers, error };
}
