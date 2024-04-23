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
