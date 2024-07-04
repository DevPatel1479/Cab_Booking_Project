// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useLocation } from 'react-router-dom';
import './Navbar.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './Home';
import BookRide from './BookRide';
import Drive from './Drive';
import AboutUs from './AboutUs';
import Help from './Help';
import DriverSignUp from './DriverSignUp';
import PassengerSignUp from './PassengerSignUp';
import ProfilePage from './Profilepage';

const Profile_Navbar = (profile) => {
    console.log(profile);
    const location = useLocation();

    if (location.pathname === '/profile') {
        return null; // Hide the navbar on the profile page
    }

    return (
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
                <Link to="/help" className="nav-item link">Help</Link>
            </div>
            <div className="navbar-item">
                <Link to="/profile" className="profile-icon">
                    <div className="profile-initial">{profile.profile}</div>
                </Link>
            </div>
        </div>
    );
}

const NavbarProfile = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
        return () => {
            AOS.refresh();
        };
    }, []);

    return (
        <Router>
            <div className='body'>
                <div className="app">
                    <Profile_Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/book-ride" element={<BookRide />} />
                        <Route path="/drive" element={<Drive />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/signup/driver" element={<DriverSignUp />} />
                        <Route path="/signup/passenger" element={<PassengerSignUp />} />
                        {/* Add a route for the profile page */}
                        <Route path="/profile" element={<ProfilePage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

    


export  {NavbarProfile, Profile_Navbar};
