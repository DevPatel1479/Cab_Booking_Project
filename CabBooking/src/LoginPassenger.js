import React, { useState, useEffect } from 'react';
import './LoginPassenger.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginPassenger = () => {
  const [email, setEmail] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setShowEmailError(false); // Reset error state when input changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your validation logic here
    if (!email.includes('@') || !email.includes('.')) {
      setShowEmailError(true);
      return;
    }
    // Proceed with form submission
    const response = await axios.post("http://localhost:3005/api/login", {email : email});
    if (response.data == "Email success"){
      navigate('/login-verification');
    }
  };
  
  const ValidationPopup = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000); // Auto dismiss after 3 seconds

      return () => {
        clearTimeout(timer);
      };
    }, []);

    return (
      <div className={`validation-popup ${isVisible ? 'visible' : 'hidden'}`}>
        <p>{message}</p>
        <div className="status-bar" style={{ width: isVisible ? '100%' : '0' }}></div>
      </div>
    );
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Login as Passenger</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="input-label">Enter Email Address</h2>
          <input
            type="text"
            value={email}
            onChange={handleInputChange}
            className="input-field"
          />
          {showEmailError && <ValidationPopup message="Please enter a valid email address" />}
          <button type="submit" className="submit-button">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPassenger;
