import React from 'react';
import Navbar from './Navbar';
import {Link, useNavigate } from 'react-router-dom';
import "./Login.css";




const Login = () => {
    const navigate = useNavigate();
    const handleOnLoginPassenger = ()=>{
        
        navigate("/login/passenger");
    }

    return (
       
        <>
            
            <Navbar/>

            <div className="content" style={{backgroundColor : 'black'}}>
                <div className="text-content" data-aos ="slide-right">
                   
                    
                   

                    <br />
                    <br />
                    <button className="new_button">Log in as Driver</button>


                </div>
                <div className="new_image-content" data-aos ="fade-up">
                <img src={require('./login_driver.png')} alt="Image 1" height={400} width={500}/>
                </div>
            </div>
            <div className="new_reverse-content">
                <div className="new_reverse-text-content" data-aos ="slide-left">
                <button className="new_button" onClick={handleOnLoginPassenger}>Log in as Passenger</button>
                    <br />
                    <br />
                </div>
                <div className="new_reverse-image-content" data-aos ="fade-up">
                <img src={require('./passenger_login.png')} alt="Image 1" height={400} width={500}/>
                </div>
            </div>

            


        
        </>        
    );
}

export default Login;
