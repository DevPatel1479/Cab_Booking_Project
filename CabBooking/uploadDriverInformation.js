const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

const app = express();
const port = 5070;

app.use(bodyParser.json());
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "webapi-88a91.appspot.com"
});

const bucket = admin.storage().bucket();

// Configure Multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the /upload endpoint
app.post('/upload', upload.array('files'), async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send('No files uploaded.');
    }

    const uploadPromises = req.files.map(file => {
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype
        }
      });

      return new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
          reject(err);
        });

        blobStream.on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          resolve(publicUrl);
        });

        blobStream.end(file.buffer);
      });
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    res.status(200).send({ files: uploadedFiles });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
