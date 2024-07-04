const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com"
});
const db = admin.database();
const ref = db.ref('Location');
// Initialize Firebase Admin SDK

let phoneCoords = null; // Store phone coordinates

app.use(bodyParser.json());
app.use(cors());

// Endpoint to receive location updates from the phone and store the coordinates
app.post('/update-location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(`Received coordinates - Latitude: ${latitude}, Longitude: ${longitude}`);
  

  // Update phoneCoords with the new coordinates
  ref.update({ latitude, longitude })
    .then(() => {
      console.log('Location updated successfully');
      res.status(200).send('Location received');
    })
    .catch((error) => {
      console.error('Error updating location:', error);
      res.status(500).send('Error updating location');
    });
});


// // Endpoint to send phone coordinates to the React app
// app.get('/phone-coordinates', (req, res) => {
//   ref.once('value', (snapshot) => {
//     const data = snapshot.val();
//     if (data) {
//       const { latitude, longitude } = data;
//       res.status(200).json({ latitude, longitude });
//     } else {
//       res.status(404).send('Phone coordinates not available');
//     }
//   }, (errorObject) => {
//     console.error('Error reading data:', errorObject);
//     res.status(500).send('Error reading data');
//   });  
// });

app.listen(port, () => {
  console.log(`Server running at       https://c7ea-103-240-204-117.ngrok-free.app`);
});
