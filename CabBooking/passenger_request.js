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

app.post("/api/send-ride-request", async (req, res) => {
    const db = admin.database().ref("Driver_Panel");
    const data = req.body;
    console.log(data.request);
    if (data && data.request) {
        db.push({"request-ride" : data.request})
        res.send("success");
    } else {
      res.status(400).send({ message: 'No ride request data provided' });
    }
  });
  

app.get("/api/get-ride-requests", async (req, res) => {
    const db = admin.database().ref("Driver_Panel");
    db.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const numberOfNodes = Object.keys(data).length;
        console.log(`Number of nodes: ${numberOfNodes}`);
        res.status(200).send({ numberOfNodes });
      } else {
        res.status(404).send({ message: 'No ride requests found' });
      }
    }, (error) => {
      console.error('Error fetching ride requests:', error);
      res.status(500).send({ message: 'Failed to fetch ride requests', error });
    });
  });

app.listen(9800, () => {
  console.log("Server listening at http://192.168.0.128:9800/api/send-ride-request");
});
