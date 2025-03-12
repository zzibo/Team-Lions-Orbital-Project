require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/notes");
const userRoutes = require("./routes/user");
const cors = require("cors");

const corsOptions = {
  // origin: "https://echonotes-fe.onrender.com",
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// express app
const app = express();

// middleware
app.use(cors(corsOptions));
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
