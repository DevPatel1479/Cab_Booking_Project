import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
    });
  
    const [errors, setErrors] = useState({});
    const [userId, setUID] = useState(null);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const validateForm = () => {
      const newErrors = {};
      const nameRegex = /^[a-zA-Z]+$/;
  
      // Check for empty fields
      Object.keys(formData).forEach((key) => {
        if (!formData[key]) {
          newErrors[key] = 'This field is required';
        }
      });
  
      // Validate first and last name
      if (formData.firstName && !nameRegex.test(formData.firstName)) {
        newErrors.firstName = 'First Name should only contain letters';
      }
  
      if (formData.lastName && !nameRegex.test(formData.lastName)) {
        newErrors.lastName = 'Last Name should only contain letters';
      }
  
      // Validate email
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
  
      // Validate password
      if (formData.password && formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
  
      // Validate phone number
      if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Phone number must be 10 digits';
      }
  
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      if (validateForm()) {
        // Assuming validation is successful, proceed with redirection
        
        navigate('/documentupload', { state: formData }); // Redirect with form data
      }
    };
  
    const styles = {
      body: {
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        backgroundColor: 'black',
        color: 'white',
      },
      container: {
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #333',
        borderRadius: '5px',
        backgroundColor: '#222',
      },
      h2: {
        textAlign: 'center',
        color: 'white', // Change color to white
      },
      formGroup: {
        marginBottom: '20px',
      },
      label: {
        display: 'block',
        marginBottom: '5px',
        color: 'white', // Change color to white
      },
      input: {
        width: '95%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #555',
        borderRadius: '5px',
        backgroundColor: '#333',
        color: 'white',
      },
      button: {
        width: '47.5%',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #555',
        borderRadius: '10px',
        backgroundColor: 'green',
        color: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginLeft: '24%',
      },
      buttonHover: {
        backgroundColor: 'darkgreen',
      },
      error: {
        color: 'red',
        fontSize: '12px',
      },
    };
  
    return (
      <div className='body' style={styles.body}>
        <div style={styles.container}>
          <form id="signup-form" onSubmit={handleFormSubmit}>
            <h2 style={styles.h2}>Driver Sign Up</h2>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
              {errors.firstName && <p style={styles.error}>{errors.firstName}</p>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
              {errors.lastName && <p style={styles.error}>{errors.lastName}</p>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
              {errors.email && <p style={styles.error}>{errors.email}</p>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
              {errors.password && <p style={styles.error}>{errors.password}</p>}
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                style={styles.input}
              />
              {errors.phoneNumber && <p style={styles.error}>{errors.phoneNumber}</p>}
            </div>
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            >
              Next
            </button>
          </form>
        </div>
      </div>
    );
  }
const DriverSignup = ()=>{
    return (
<div className='body'>
            {/* <Routes>
                <Route path="/signup/driver" element={<SignUp />} />
                <Route path="/documentupload" element={<DocumentUploadForm />} />
                <Route path="/accountdetails" element={<AccountDetails />} />
            </Routes> */}
            <SignUp/>
        </div>

    );
}

export default DriverSignup;