<<<<<<< HEAD
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com"
});

const app = express();
app.use(cors());
app.use(express.json());

// Function to generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Function to hash password
async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

app.post('/api/passenger_data', async (req, res) => {
  const formData = req.body;
  
  // Generate OTP
  const otp = generateOTP();

  try {
    // Hash the password
    const hashedPassword = await hashPassword(formData.password);

    // Store form data in Firebase Realtime Database
    await admin.database().ref('passenger_details').push({
      ...formData,
      password: hashedPassword, // Replace password with hashedPassword
      otpStatus: false // Initially set OTP status to false
    });

    console.log("Form data saved successfully... ");

    // Sending email with OTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'devpatel1828king@gmail.com',
        pass: 'hxzkyawmduixcluh'
      }
    });

    const mailOptions = {
      from: 'devpatel1828king@gmail.com', // Sender email
      to: formData.email,
      subject: 'OTP for verification',
      text: `Your OTP for verification is: ${otp}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error sending email: ", error);
        res.status(500).send('Error sending OTP');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Form data saved successfully. OTP sent to your email.');
      }
    });
  } catch (error) {
    console.error("Error saving form data: ", error);
    res.status(500).send('Error saving form data: ' + error.message);
  }
});

app.get('/api/passenger_data', (req, res) => {
  // Handle GET request logic here
  res.end("");
});

app.listen(3000, () => {
  console.log(`Server running on port http://localhost:3000/api/passenger_data`);
});
=======
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


app.post('/api/passenger_data', async (req, res) => {
  const formData = req.body;

  // Store form data in Firebase Realtime Database
  admin.database().ref('passenger_details').push(formData)
    .then(() => {
      console.log("Data saved successfully... ");
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
>>>>>>> cf496a10d47dfa036521d06d6f5255cbda971068
