const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const routes = require("./Routes/index.js"); 
const app = express();

const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/LMS');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to NodeExpress!");
});

app.use("/", routes);

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server running on port ${port}`);
  } else {
    console.error("Error starting server:", err);
  }
});
