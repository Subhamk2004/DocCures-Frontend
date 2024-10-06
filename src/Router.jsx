import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Router() {
    return (
        <div className="h-[100%] ">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Router;