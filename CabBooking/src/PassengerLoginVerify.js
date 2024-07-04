import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';



const PassengerOTPLoginForm = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [isInvalidOTP, setIsInvalidOTP] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false); // State to hide the navbar
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));
  const navigate = useNavigate();
  const handleInputChange = (e, index) => {
    const newOTP = [...otp];
    newOTP[index] = e.target.value;
    setOTP(newOTP);

    if (e.target.value !== '' && index < 5) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combining OTP digits into a single string
    const enteredOTP = otp.join('');

    try {
      const response = await axios.post('http://localhost:3005/api/verify-otp-login', { otp: enteredOTP });
      // console.log(response.data);
      if (response.data !== "Failed") {
        console.log("Login success !");
        const cookies = new Cookies();
        cookies.set('userEmail', response.data, { secure: true, sameSite: 'strict' , maxAge: 864000});
        const pickaddr = sessionStorage.getItem("pickupAddr");
        const dropaddr  = sessionStorage.getItem("dropoffAddr");
        if (pickaddr && dropaddr){
          navigate('/book-ride/request-cab');
        }
        else{
          navigate("/");
        }
        
      } else {
        setIsInvalidOTP(true);
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error while submitting OTP:', error);
    }
  };



  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8f9fa' }}>
      <div style={{ backgroundColor: 'white', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', borderRadius: '15px', padding: '20px', width: '300px' }}>
        {hideNavbar ? null : (
          <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
            {/* Your navbar code here */}
          </nav>
        )}
        <h2 style={{ textAlign: 'center' }}>OTP Verification</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2>Enter OTP</h2>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>

            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs.current[index]}
                type="text"
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                style={{
                  padding: '8px',
                  marginRight: '5px',
                  border: `1px solid ${isInvalidOTP ? 'red' : '#007bff'}`,
                  borderRadius: '3px',
                  width: '30px',
                  textAlign: 'center',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: 'black'
                }}
                maxLength="1"

              />
            ))}
          </div>
          {isInvalidOTP && <p style={{ color: 'red', marginTop: '5px' }}>Invalid or wrong OTP attempted</p>}
          <button type="submit" style={{ padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Verify OTP</button>
        </form>

      </div>
    </div>
  );
};

export default PassengerOTPLoginForm;
