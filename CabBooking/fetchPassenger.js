const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

const app = express();
const port = 4050;

app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com"
});

const db = admin.database();

app.get('/passenger_details', async (req, res) => {
    const ref = db.ref('passenger_details');
  
    ref.once('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
      //   const { latitude, longitude } = data;
        
        res.json(data)
      } else {
        res.status(404).send('Phone coordinates not available');
      }
    }, (errorObject) => {
      console.error('Error reading data:', errorObject);
      res.status(500).send('Error reading data');
    });  
  });
  
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
