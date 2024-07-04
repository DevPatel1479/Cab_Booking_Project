import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, orderByChild, limitToLast, get } from 'firebase/database';

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

const OTPVerificationFormPage = () => {
    const [otp, setOTP] = useState('');
    const [isInvalidOTP, setIsInvalidOTP] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpRef = ref(database, 'OTP');
        const otpQuery = limitToLast(orderByChild(otpRef, 'timestamp'), 1);
        const snapshot = await get(otpQuery);
        const otpData = snapshot.val();
        const olderOTP = otpData ? Object.values(otpData)[0] : null;

        if (otp !== olderOTP) {
            setIsInvalidOTP(true);
            return;
        }

        setIsInvalidOTP(false);
        navigate('/profileHome/');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', width: '300px' }}>
                <h2>OTP Verification</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label htmlFor="otp" style={{ marginBottom: '10px' }}>Enter OTP:</label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        style={{ padding: '8px', marginBottom: '10px', border: `1px solid ${isInvalidOTP ? 'red' : '#ccc'}`, borderRadius: '3px', width: '100%' }}
                    />
                    {isInvalidOTP && <p style={{ color: 'red', marginTop: '5px' }}>Invalid or wrong OTP attempted</p>}
                    <button type="submit" style={{ padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Verify OTP</button>
                </form>
            </div>
        </div>
    );
};

export default OTPVerificationFormPage;
