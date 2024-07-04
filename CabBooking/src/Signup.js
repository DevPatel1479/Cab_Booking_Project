import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
// import DriverSignUp from './DriverSignUp';
import Navbar from './Navbar';

const Signup = () => {
    return (

        <div>
            <Navbar/>
            <div className="content" style={{backgroundColor : 'black'}}>
                <div className="text-content" data-aos="slide-right">
                    <br />
                    <br />
                    <Link to="/signup/passenger">
                        <button className="new_button">Sign Up as Passenger</button>
                    </Link>
                </div>
                <div className="new_image-content" data-aos="fade-up">
                    <img src={require('./Passenger_SignUp.png')} alt="Passenger SignUp" height={400} width={500} />
                </div>
            </div>
            <div className="new_reverse-content">
                <div className="new_reverse-text-content" data-aos="slide-left">
                    <Link to="/signup/driver">
                        <button className="new_button">Sign Up as Driver</button>
                    </Link>
                    <br />
                    <br />
                </div>
                <div className="new_reverse-image-content" data-aos="fade-up">
                    <img src={require('./Driver_SignUp.png')} alt="Driver SignUp" height={400} width={500} />
                </div>
            </div>
            {/* <Routes>
                <Route path="/signup/driver" element={<DriverSignUp />} />
                {/* Add routes for other signup options */}
            {/* </Routes> */} */
        </div>
    );
}

export default Signup;