import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import AboutUs from './AboutUs';
import Drive from './Drive';
import BookRide from './BookRide';
import Help from './Help';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling
import AOS from 'aos';
import 'aos/dist/aos.css';

axios.defaults.baseURL = 'http://192.168.0.121:3000'; // Replace with the IP address of the server

const App = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
        return () => {
            AOS.refresh();
        };
    }, []);

    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('http://192.168.0.121:3000/api/data') // Use relative URL here
            .then(response => {
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <Router>
            <div className='body'>
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

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/book-ride" element={<BookRide />} />
                    <Route path="/drive" element={<Drive />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/help" element={<Help />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
