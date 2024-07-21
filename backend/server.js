require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/notes");
const userRoutes = require("./routes/user");
const cors = require("cors");

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the URL of your frontend
  optionsSuccessStatus: 200
};

// express app
const app = express();

// middleware
app.use(cors(corsOptions))
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/notes", noteRoutes);
app.use("/api/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//unused aws code

/*
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
*/

/* Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3()

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'your-s3-bucket-name',
      acl: 'public-read',
      key: function (req, file, cb) {
        cb(null, Date.now().toString() + '-' + file.originalname); // File name in S3
      }
    })
  });
*/
