import React, { useEffect } from 'react';
import './Navbar.css'; // Import your CSS file for styling
import AOS from 'aos';

import 'aos/dist/aos.css';




const App = () => {

    useEffect(()=>{
        AOS.init({duration : 2000})
        return () => {
            AOS.refresh();
        };
    }, []);

    return (
        
        <div className='body'>
            <div className="navbar">
                <div className="navbar-item logo">
                    <span className="logo-text">GoRide</span>
                </div>
                <div className="navbar-item">
                    <span className="nav-item">Book Ride</span>
                </div>
                <div className="navbar-item">
                    <span className="nav-item">Drive</span>
                </div>
                <div className="navbar-item">
                    <span className="nav-item">About Us</span>
                </div>
                <div className="navbar-item">
                    <span className="nav-item">Login</span>
                </div>
                <div className="navbar-item">
                    <span className="nav-item">Signup</span>
                </div>
                <div className="navbar-item">
                    <span className="nav-item">Help</span>
                </div>
            </div>
            
            <div className="content">
                <div className="text-content" data-aos ="slide-right">
                    <h2>Welcome to GoRide</h2>
                    
                    <p>Experience stress-free travel with GoRide. Book easily, track your ride in real-time, and enjoy safe journeys with our professional drivers. Join us today and discover a new way to travel!</p>

                    <br />
                    <br />
                    <button className="button">Start the Journey</button>


                </div>
                <div className="image-content" data-aos ="fade-up">
                <img src={require('./GoRide_Website.png')} alt="Image 1" height={400} width={500}/>
                </div>
            </div>

            <div className="reverse-content">
                <div className="reverse-text-content" data-aos ="slide-left">
                    <h2>Become a GoRide Driver</h2>
                    <p>Experience the joy of driving with GoRide. Join our team of professional drivers and enjoy the freedom of the open road. With flexible schedules and competitive pay, driving for GoRide is more than just a job—it's a rewarding experience.</p>
                    
                    <br />
                    <br />
                    <button className="button">Drive On</button>
                    <button className="button">Earn Reward</button>
                </div>
                <div className="reverse-image-content" data-aos ="fade-up">
                <img src={require('./Driver_img.png')} alt="Image 1" height={400} width={500}/>
                </div>
            </div>

            <div className="content">
                <div className="text-content" data-aos ="slide-right">
                    <h2>Enjoy the Ride</h2>
                    <p>Enjoy every moment of your ride with GoRide. Our professional drivers ensure your safety while engaging you in friendly conversation. Relax and soak in the sights as you travel. GoRide: more than just a ride, it's an experience.</p>
                    <br />
                    <br />
                    <button className="button">Book Ride</button>
                    <button className="button">Get Benefits</button>
                </div>
                <div className="image-content" data-aos ="fade-up">
                <img src={require('./Passenger_img.png')} alt="Image 1" height={400} width={500}/>
                </div>
            </div>


        </div>
    );
}

export default App;
