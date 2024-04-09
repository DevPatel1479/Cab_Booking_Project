const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const nodemailer = require('nodemailer');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com"
});

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    
    service: 'gmail',
    auth: {
        user: 'devpatel1828king@gmail.com',
        pass: 'hxzkyawmduixcluh'
    }});

async function sendOTPByEmail(email, otp) {
  const mailOptions = {
    from: 'devpatel1828king@gmail.com', // Sender email
    to: email,
    subject: 'Your OTP for Verification',
    text: `Your OTP for GoRide Sign-up is: ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

app.post('/api/passenger_data', async (req, res) => {
  const formData = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP
  console.log('Generated OTP:', otp);

  // Store form data in Firebase Realtime Database
  admin.database().ref('passenger').push(formData)
    .then(() => {
      sendOTPByEmail(formData.email, otp); // Send OTP to the email provided in the form
      res.status(200).send('Form data saved successfully');
    })
    .catch((error) => {
      res.status(500).send('Error saving form data: ' + error.message);
    });
});

app.get('/api/passenger_data', (req, res) => {
  // Handle GET request logic here
  res.end("");
});

app.listen(3000, () => {
  console.log(`Server running on port http://localhost:3000/api/passenger_data`);
});
