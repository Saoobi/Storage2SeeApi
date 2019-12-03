//Call .env variable
require("dotenv").config();

const express = require("express"),
  app = express(),
  port = process.env.PORT || 3000;

//To connect to database
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));

//Let the server accept json
app.use(express.json());

//create router
const storageLinksRouter = require("./api/routes/storageLinks");
app.use("/storageLinks", storageLinksRouter);

app.listen(port, () => console.log("Server Started"));
