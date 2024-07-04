import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';

import {Profile_Navbar} from './ProfileInNavbar';
import Cookies from 'universal-cookie';
import axios from 'axios';



const Home = () => {
    // const location = useLocation();
    // const showDifferentNavbar = location.state && location.state.profileNavbar;
    // const userProfile = location.state && location.state.profile;
    const cookie = new Cookies();
    const user_email = cookie.get("userEmail");
    console.log(user_email);
    const [userProfile, setUserProfile] = useState(true);
    
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (user_email){
                    
                    const response = await axios.post('http://localhost:3000/api/user_profile', { email: user_email });
                    setUserProfile(response.data);
    
                }

            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        if (user_email) {
            fetchUserProfile();
        }
    }, [user_email]);    
    
    return (
        <>
        {/* <Navbar/> */}
        {userProfile && user_email ? (
            // <NavbarProfile/>
            <Profile_Navbar profile = {userProfile}/>
      ) : (
        <Navbar/>
      )}
            <div className="content" style={{backgroundColor : 'black'}}>
                
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

            <div className="content" style={{backgroundColor : 'black'}}>
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
        </>

    );
}

export default Home;
