import React, { useState } from "react";
import "./Passenger_SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000';

const PassengerSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: ""
  });
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const url = "http://localhost:3000/api/passenger_data"
        const response = axios.post(url, formData, { headers: { 'Content-Type': 'application/json' } });
        console.log('Form data saved successfully:', (await response).data);
        setFormData({
          name: '',
          email: '',
          password: '',
          phoneNumber: ''
        });
      } catch (error) {
        console.error('Error saving form data:', error.message);
      }
    }
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
export default PassengerSignUp;