import React, { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./components/Loading";
import AlertDisplay from "./components/AlertDisplay";
import useAppointments from "./hooks/useAppointments.mjs";

function Router() {

    const { isLoading, error } = useAuth();
    const { appointments, isLoading: bookingsLoading, error: bookingsError } = useAppointments();

    useEffect(() => {
        
    }, [isLoading, error, bookingsLoading, bookingsError])

    let { isAuthenticated } = useSelector(state => state.user);
    let navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            console.log(isAuthenticated);
            navigate('/');
        }
        else {
            console.log(isAuthenticated);
        }
    }, [isAuthenticated])

    if (isLoading || bookingsLoading) {
        return <Loading />;
    }

    if (error || bookingsError) {
        return <AlertDisplay />;
    }

    return (
        <div className="flex flex-col items-center">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Router;