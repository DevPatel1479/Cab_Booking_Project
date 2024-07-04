import React, { useState, useEffect } from 'react';
import NavbarProfile from './ProfileInNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({});
    const [userName, setUserName] = useState();
    const cookie = new Cookies();
    const user_email = cookie.get("userEmail");
    console.log(user_email);

    const navigate = useNavigate();
    const containerStyle = {
        maxWidth: '800px',
        margin: '20px auto',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        position: 'relative',
    };

    const sectionStyle = {
        marginBottom: '30px',
        borderBottom: '1px solid #ddd',
        paddingBottom: '20px',
    };

    const h2Style = {
        borderBottom: '2px solid #007bff',
        paddingBottom: '10px',
        marginBottom: '15px',
        color: '#333',
    };

    const sectionContentStyle = {
        paddingLeft: '20px',
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease-in-out',
        textDecoration: 'none',
        fontSize: '20px',
        lineHeight: '1',
    };

    const buttonStyle = {
        marginTop: '20px',
        width: 'calc(50% - 20px)',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        padding: '18px',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease-in-out',
    };

    const handleLogout = () => {
        cookie.remove("userEmail");
        navigate("/");
    };

    const handleNavigateBack = () => {
        window.history.back();
    };

    const [profilePhoto, setProfilePhoto] = useState(null);

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const fetchInformation = async () => {
        try {
            const resp = await axios.post('http://localhost:3030/profile-data', { email: user_email });
            console.log(resp.data);
            setUserName(resp.data.email.split('@')[0]);
            setProfileData(resp.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchInformation();
    }, []);

    return (
        <div style={containerStyle}>
            <a href="#" style={closeButtonStyle} onClick={handleNavigateBack}>&times;</a>
            <h1>User Profile</h1>
            <label htmlFor="photo-upload" style={{ cursor: 'pointer' }}>
                <div style={{ width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
                    {profilePhoto ? <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} /> : <FontAwesomeIcon icon={faUser} style={{ fontSize: '80px', color: '#ccc' }} />}
                </div>
                <input type="file" id="photo-upload" style={{ display: 'none' }} onChange={handlePhotoUpload} accept="image/*" />
            </label>
            <div style={sectionStyle}>
                <h2 style={h2Style}>Personal Information</h2>
                <div style={sectionContentStyle}>
                    <p>Full Name: {profileData.name}</p>
                    <p>Email: {profileData.email}</p>
                    <p>Contact Number: {profileData.phoneNumber}</p>
                </div>
            </div>
            <div style={sectionStyle}>
                <h2 style={h2Style}>Account Details</h2>
                <div style={sectionContentStyle}>
                    <p>Username: {userName}</p>
                </div>
            </div>
            <button style={{ ...buttonStyle, marginBottom: '10px', fontSize: '20px' }}>Edit Profile</button>
            <button style={{ ...buttonStyle, marginBottom: '10px', fontSize: '20px', marginLeft: '10px' }} onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default ProfilePage;
