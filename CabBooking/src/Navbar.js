import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        setShowNavbar(location.pathname !== '/signup/driver' && location.pathname !== '/signup/passenger');

    }, [location]);

    return (
        <>
            {showNavbar && (
                <div className="navbar">
                    <div className="navbar-item logo">
                        <Link to="/" className="logo-text link">GoRide</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/book-ride" className="nav-item link">Book Ride</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/drive" className="nav-item link">Drive</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/about-us" className="nav-item link">About Us</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/login" className="nav-item link">Login</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/signup" className="nav-item link">Signup</Link>
                    </div>
                    <div className="navbar-item">
                        <Link to="/help" className="nav-item link">Help</Link>
                    </div>
                </div>
            )}
        </>
    );
}


export default Navbar;