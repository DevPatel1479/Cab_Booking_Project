import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import DocumentUploadForm from './driver_documentUpload';

function DriverSignupForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: 'white',
      color: 'black',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    h2: {
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '8px',
      boxSizing: 'border-box',
      border: '1px solid #ccc',
      borderRadius: '4px',
    },
    button: {
      display: 'block',
      width: '100%',
      padding: '10px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    buttonHover: {
      backgroundColor: '#218838',
    },
  };
  
  return (
    <div style={styles.container}>
      <form id="signup-form" onSubmit={handleSubmit}>
        <h2 style={styles.h2}>Driver Sign Up</h2>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="first-name">First Name:</label>
          <input style={styles.input} type="text" id="first-name" name="first-name" required />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="last-name">Last Name:</label>
          <input style={styles.input} type="text" id="last-name" name="last-name" required />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email:</label>
          <input style={styles.input} type="email" id="email" name="email" required />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">Password:</label>
          <input style={styles.input} type="password" id="password" name="password" required />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="phone-number">Phone Number:</label>
          <input style={styles.input} type="tel" id="phone-number" name="phone-number" required />
        </div>
        <Link to='/driver/signup'>
        <button type="submit" style={styles.button}>Next</button>
        </Link>
      </form>
    </div>
  );
}

export default DriverSignupForm;
