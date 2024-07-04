const express = require('express');
const app = express();
const port = 3040;
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const bodyParser = require('body-parser');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webapi-88a91-default-rtdb.firebaseio.com"
});
const db = admin.database();
const ref = db.ref('Location');

app.use(bodyParser.json());
app.use(cors());


app.get("/get-coordinates", async (req, res)=>{
    
    ref.once('value', (snapshot) => {
    const data = snapshot.val();
    if (data) {
    //   const { latitude, longitude } = data;
      
      res.send(data)
    } else {
      res.status(404).send('Phone coordinates not available');
    }
  }, (errorObject) => {
    console.error('Error reading data:', errorObject);
    res.status(500).send('Error reading data');
  });  

});

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/get-coordinates`)
});