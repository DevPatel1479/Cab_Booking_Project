import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Navbar.css'; 
// import Navbar from './Navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from './Home';
import BookRide from './BookRide';
import Drive from './Drive';
import AboutUs from './AboutUs';
import Login from './Login';
import Signup from './Signup';
import Help from './Help';
// import Driver_SignUp from './DriverSignUp';
import DriverSignup from './sign-up';
import PassengerSignUp from './PassengerSignUp';
import OTPVerificationForm from './OTPVerificationForm';
import ProfilePage from './Profilepage';
import LoginPassenger from './LoginPassenger';
import PassengerOTPLoginForm from './PassengerLoginVerify';
import DocumentUploadForm from './documentupload';
import Maps from './search4';

const HideNavbarRoutes = ['/otp-verify'];

const App = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 });
        return () => {
            AOS.refresh();
        };
    }, []);

    const [showNavbar, setShowNavbar] = useState(true);

    useEffect(() => {
        const currentPath = window.location.pathname;
        console.log(currentPath);
        setShowNavbar(!HideNavbarRoutes.includes(currentPath));
    }, []);

    return (
        <Router>
            <div className='body'>
                {/* {showNavbar && <Navbar />} */}
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/book-ride" element={<BookRide />} />
                    <Route exact path="/drive" element={<Drive />} />
                    <Route exact path="/book-ride/request-cab" element={<Maps />} />
                    <Route exact path="/about-us" element={<AboutUs />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/help" element={<Help />} />
                    <Route exact path="/signup/driver" element={<DriverSignup />} />
                    <Route exact path="/signup/passenger/*" element={<PassengerSignUp />} />
                    <Route exact path="/otp-verify" element={<OTPVerificationForm />} />
                    <Route exact path="/profile" element={<ProfilePage />} />
                    <Route exact path="/login/passenger" element={<LoginPassenger/>}/>
                    <Route exact path="/login-verification" element={<PassengerOTPLoginForm/>} />

                    <Route exact path="/documentupload" element={<DocumentUploadForm />} />
                    

                </Routes>
            </div>
        </Router>
    );
}

export default App;
