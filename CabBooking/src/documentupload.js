import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const DocumentUploadForm = () => {
  const location = useLocation();
  console.log(location.state);
  
  const [licenseName, setLicenseName] = useState('License');
  const [registrationName, setRegistrationName] = useState('Vehicle Registration');
  const [insuranceName, setInsuranceName] = useState('Insurance');
  const [identityName, setIdentityName] = useState('Identity');
  const [passportPhotoName, setPassportPhotoName] = useState('Passport Photo');
  const [popupVisible, setPopupVisible] = useState(true);
  const [files, setFiles] = useState({});
  const [driverData, setDriverData] = useState(null);

  useEffect(() => {
    location.state && setDriverData(location.state);
  }, [location.state]);
  
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopupVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (event, setName, fileKey) => {
    setName(event.target.files[0].name);
    setFiles(prevFiles => ({ ...prevFiles, [fileKey]: event.target.files[0] }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      
      Object.keys(files).forEach(key => {
        formData.append('files', files[key]); // Field name 'files'
      });

      try {
        const response = await axios.post('http://localhost:5070/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Uploaded files:', response.data.files);
        const driverDataResponse = await axios.post('http://localhost:7040/add-drivers', driverData);
        console.log(driverDataResponse);

        const driverDocument = await axios.post('http://localhost:7040/add-documents', {"email" : driverData.email, "files_url" : response.data.files});
        console.log(driverDocument);

      } catch (error) {
        console.error('Error uploading files:', error);
      }
    }
  };

  const validateForm = () => {
    // Implement your validation logic here
    // Return true if the form is valid, otherwise false
    return true;
  };

  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#121212',
      margin: 0,
      padding: 0,
      color: '#fff',
    },
    container: {
      maxWidth: '600px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#333',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      color: '#fff',
    },
    h2: {
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      fontWeight: 'bold',
      color: '#bbb',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginTop: '5px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      backgroundColor: '#444',
      color: '#fff',
    },
    customFileInput: {
      display: 'none',
    },
    customFileLabel: {
      display: 'inline-block',
      width: 'calc(100% - 120px)',
      padding: '10px',
      backgroundColor: '#444',
      color: '#fff',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginRight: '10px',
      boxSizing: 'border-box',
    },
    customFileImage: {
      width: '100px',
      height: '100px',
      objectFit: 'contain',
      cursor: 'pointer',
    },
    customFileContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    submitButton: {
      display: 'inline-block',
      padding: '10px 20px',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#28a745',
      color: '#fff',
      cursor: 'pointer',
      width: '350px',
      marginLeft: '120px',
    },
    submitButtonHover: {
      backgroundColor: '#218838',
    },
    popup: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxWidth: '500px',
      backgroundColor: '#28a745',
      color: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      textAlign: 'center',
      zIndex: 1000,
      fontSize: '18px',
    },
    popupStrong: {
      display: 'block',
      marginBottom: '10px',
      fontSize: '20px',
    },
  };

  return (
    <div style={styles.body}>
      {popupVisible && (
        <div style={styles.popup}>
          <strong style={styles.popupStrong}>Note:</strong>
          By clicking on the image you can upload documents.
        </div>
      )}
      <div style={styles.container}>
        <h2 style={styles.h2}>Document Upload Form</h2>
        <form id="uploadForm" onSubmit={handleFormSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="license">Driver's License (with clear expiry date):</label>
            <div style={styles.customFileContainer}>
              <input
                type="file"
                id="license"
                name="license"
                accept="image/*"
                style={styles.customFileInput}
                required
                onChange={(e) => handleFileChange(e, setLicenseName, 'license')}
              />
              <label htmlFor="license" style={styles.customFileLabel}>{licenseName}</label>
              <img
                src="images/Driving.PNG"
                alt="License Image"
                style={styles.customFileImage}
                onClick={() => document.getElementById('license').click()}
              />
            </div>
            <input type="date" id="licenseExpiry" name="licenseExpiry" style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="registration">Vehicle Registration Certificate:</label>
            <div style={styles.customFileContainer}>
              <input
                type="file"
                id="registration"
                name="registration"
                accept="image/*"
                style={styles.customFileInput}
                required
                onChange={(e) => handleFileChange(e, setRegistrationName, 'registration')}
              />
              <label htmlFor="registration" style={styles.customFileLabel}>{registrationName}</label>
              <img
                src="images/vehicle.PNG"
                alt="Registration Image"
                style={styles.customFileImage}
                onClick={() => document.getElementById('registration').click()}
              />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="insurance">Vehicle Insurance (with clear expiry date):</label>
            <div style={styles.customFileContainer}>
              <input
                type="file"
                id="insurance"
                name="insurance"
                accept="image/*"
                style={styles.customFileInput}
                required
                onChange={(e) => handleFileChange(e, setInsuranceName, 'insurance')}
              />
              <label htmlFor="insurance" style={styles.customFileLabel}>{insuranceName}</label>
              <img
                src="images/insurance.PNG"
                alt="Insurance Image"
                style={styles.customFileImage}
                onClick={() => document.getElementById('insurance').click()}
              />
            </div>
            <input type="date" id="insuranceExpiry" name="insuranceExpiry" style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="identity">Proof of Identity (with clear expiry date):</label>
            <div style={styles.customFileContainer}>
              <input
                type="file"
                id="identity"
                name="identity"
                accept="image/*"
                style={styles.customFileInput}
                required
                onChange={(e) => handleFileChange(e, setIdentityName, 'identity')}
              />
              <label htmlFor="identity" style={styles.customFileLabel}>{identityName}</label>
              <img
                src="images/proof.PNG"
                alt="Identity Image"
                style={styles.customFileImage}
                onClick={() => document.getElementById('identity').click()}
              />
            </div>
            <input type="date" id="identityExpiry" name="identityExpiry" style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="passportPhoto">Passport Size Photo:</label>
            <div style={styles.customFileContainer}>
              <input
                type="file"
                id="passportPhoto"
                name="passportPhoto"
                accept="image/*"
                style={styles.customFileInput}
                required
                onChange={(e) => handleFileChange(e, setPassportPhotoName, 'passportPhoto')}
              />
              <label htmlFor="passportPhoto" style={styles.customFileLabel}>{passportPhotoName}</label>
              <img
                src="images/passport.PNG"
                alt="Passport Photo Image"
                style={styles.customFileImage}
                onClick={() => document.getElementById('passportPhoto').click()}
              />
            </div>
          </div>
          <button type="submit" style={styles.submitButton}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
