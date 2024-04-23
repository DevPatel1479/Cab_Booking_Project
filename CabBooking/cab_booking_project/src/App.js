import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './Navbar.css'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './Home';
import BookRide from './BookRide';
import Drive from './Drive';
import AboutUs from './AboutUs';
import Login from './Login';
import Signup from './Signup';
import Help from './Help';
import DriverSignUp from './DriverSignUp';
import PassengerSignUp from './PassengerSignUp';
const App = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
        return () => {
            AOS.refresh();
        };
    }, []);
    return (
        <Router>
            <div className='body'>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book-ride" element={<BookRide />} />
                    <Route path="/drive" element={<Drive />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/signup/driver" element={<DriverSignUp />} />
                    <Route path="/signup/passenger" element={<PassengerSignUp />} />
                </Routes>
            </div>
        </Router>
    );
}
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
export default App;