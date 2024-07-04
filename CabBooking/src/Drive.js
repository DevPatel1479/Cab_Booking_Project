import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';
import { Profile_Navbar } from './ProfileInNavbar';
import axios from 'axios';
import Cookies from 'universal-cookie';


const Drive = () => {
    const cookie = new Cookies();
    const user_email = cookie.get("userEmail");
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
                {userProfile && user_email ? (
            // <NavbarProfile/>
            <Profile_Navbar profile = {userProfile}/>
      ) : (
        <Navbar/>
      )}

        <div className="content">
            <h2>Drive</h2>
            {/* Add your drive content here */}
        </div>
        </>
    );
}


export default Drive;