import React, { useState } from "react";
import "./Passenger_SignUp.css";
import { Link, useNavigate, useLocation, Route, Router, Routes } from "react-router-dom";
import axios from "axios";
import bcrypt from 'bcryptjs';
import Navbar from "./Navbar";
import OTPVerificationForm from "./OTPVerificationForm";

axios.defaults.baseURL = 'http://localhost:3000';

console.log("Working... ");

const PassengerSignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    otp: "not verified",
    
  });
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const navigate = useNavigate(); // Access the navigate function for navigation
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "phoneNumber") {
      newValue = value.replace(/\D/g, "").substring(0, 10);
    }
    setFormData({
      ...formData,
      [name]: newValue
    });
    if (name === "password") {
      validatePassword(newValue);
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Password is required.");
    } else {
      setPasswordError("");
    }
  };

  const handleSignup = async () => {
    if (validateForm()) {
      try {
        // Hash the password
        const hashedPassword = await hashPassword(formData.password);
        const form_data = formData;
        // Send data to the API with hashed password
        const response = await axios.post("http://localhost:3000/api/passenger_data", {
          ...formData,
          password: hashedPassword
        });
        
        // console.log('Form data saved successfully:', response.data);
        setFormData({
          name: '',
          email: '',
          password: '',
          phoneNumber: '', 
          otp : "not verified",
          
        });

        
        // Navigate to OTP verification page
        // navigate("/otp-verify");
        navigate("/otp-verify", { state: { formData: {...form_data, password: hashedPassword } } });

      } catch (error) {
        console.error('Error saving form data:', error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignup();
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.phoneNumber) {
      setFormError("Please fill in all fields.");
      return false;
    }
    if (passwordError) {
      setFormError("Please correct the password.");
      return false;
    }
    setFormError("");
    return true;
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Passenger Sign Up</h2>
        {formError && <p className="error">{formError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              pattern="[0-9]*"
              maxLength="10"
              required
            />
          </div>
          <div className="buttons-container">
            <button type="submit" className="signup-button">Sign Up</button>
            <div>
              <Link to="/signup" className="back-link">Back</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const PassengerSignUp = () => {
  const location = useLocation();
  return (
    <div>
      <PassengerSignUpPage />
      {/* {location.pathname !== '/otp-verify' && <Navbar />}
      <Routes>
        <Route exact path="/otp-verify" element={<OTPVerificationForm />} />
      </Routes> */}
    </div>
  );
}

// Function to hash password
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export default PassengerSignUp;
