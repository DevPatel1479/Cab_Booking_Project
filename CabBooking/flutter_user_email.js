const express = require('express');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Path to your service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://webapi-88a91-default-rtdb.firebaseio.com/' // Replace with your Firebase Realtime Database URL
});

const db = admin.database(); // Use Realtime Database for storing OTPs

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'devpatel1828king@gmail.com',
    pass: 'hxzkyawmduixcluh'
  }
});

async function sendOTPByEmail(email, otp) {
  const mailOptions = {
    from: 'devpatel1828king@gmail.com',
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP for Login is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
}

async function saveOTPToFirebase(email, otp) {
  const otpRef = db.ref('otps').push(); // Generate a unique key for the OTP
  const otpKey = otpRef.key;
  try {
    await otpRef.set({
      email: email,
      otp: otp,
      timestamp: admin.database.ServerValue.TIMESTAMP
    });
    console.log('OTP saved to Firebase with key:', otpKey);
    return otpKey;
  } catch (error) {
    console.error('Error saving OTP to Firebase:', error.message);
    throw error;
  }
}

// Sample route to send OTP to the email provided
app.get('/api/send_otp/:email', async (req, res) => {
  const email = req.params.email; // Extract email from the URL parameters
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
  console.log('Generated OTP:', otp);

  try {
    await sendOTPByEmail(email, otp);
    const otpKey = await saveOTPToFirebase(email, otp);
    res.status(200).send({ otpKey: otpKey, message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).send('Error sending OTP: ' + error.message);
  }
});

app.listen(3000, () => {
  console.log('Server running on port http://192.168.10.206:3000');
});
