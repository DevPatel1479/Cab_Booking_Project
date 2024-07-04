import React, { useState, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { useNavigate, useLocation } from 'react-router-dom';
import  Cookies  from 'universal-cookie';
import axios from 'axios';

const firebaseConfig = {
  apiKey: "AIzaSyCcdVnAjkio5WIqPYeTQexER0QgdIhnh1M",
  authDomain: "webapi-88a91.firebaseapp.com",
  databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com",
  projectId: "webapi-88a91",
  storageBucket: "webapi-88a91.appspot.com",
  messagingSenderId: "102122774240",
  appId: "1:102122774240:web:aedee404a652e9d8cdfa85",
  measurementId: "G-88KQJJH4MV"

};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const OTPVerificationForm = () => {
  const location = useLocation();
  const formData = location.state.formData;
  
  
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
  
    // Fetching all OTP records from the database
    const otpRef = ref(database, 'OTP');
    const snapshot = await get(otpRef);
    const otpData = snapshot.val();
  
    // Extracting the most recent OTP record
    let storedOTP = null;
    let email = null;
    if (otpData) {
      const otpKeys = Object.keys(otpData);
      const lastKey = otpKeys[otpKeys.length - 1];
      storedOTP = otpData[lastKey].otp;
      email = otpData[lastKey].email;
      console.log(storedOTP);
    }
    console.log(enteredOTP);
    // Checking if the entered OTP matches the stored OTP
    if (enteredOTP == storedOTP) {
      setIsInvalidOTP(false);
      console.log('OTP Verified');
      const cookies = new Cookies();
      cookies.set('userEmail', formData.email, { secure: true, sameSite: 'strict' , maxAge: 864000});

      axios.post('http://localhost:3000/api/otp-verified', {
        email : email
      })
      .then(response => {
        console.log('Verification successful');
      })
      .catch(error => {
        console.error('Verification failed: ', error);
      });

      (async () => {
        try {
          let response = await axios.post('http://localhost:3000/api/user_profile', { email: email });
          let profile = response.data;
          navigate("/", { state: { profileNavbar: true, profile: profile } });
        } catch (error) {
          console.error(error);
        }
      })();


    } else {
      setIsInvalidOTP(true);
      // Proceed with further actions if OTP is valid
      
      setHideNavbar(true); // Hiding the navbar
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

export default OTPVerificationForm;
