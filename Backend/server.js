const express = require('express')
const bodyParser=require('body-parser')
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const HttpError = require('./models/http-error')
const sroute = require('./routes/studentroute');
const uroute = require('./routes/userroute')
const PORT = process.env.PORT || 8083;
const MONGODB_URI =
  "mongodb+srv://vridhi:merrychristmas@cluster0.t9arlgd.mongodb.net/student";

mongoose.connect(MONGODB_URI || "mongodb://localhost/mern_vk", {
  useNewURLParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("mongoose is connected!");
});

app.use("/api/students", sroute);
app.use("/api/user", uroute);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  //error handling middleware function
  if (res.headerSent) {
    //if a response has already been sent, don't send another response but forward the error to the next middleware
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

const Schema1 = mongoose.Schema;
const MltestonesSchema = new Schema1({}, { strict: false });
const Mltestones = mongoose.model("Mltestone", MltestonesSchema, "Mltestones");

app.get("/d1", (req, res) => {
  Mltestones.find({}).then((data) => {
    console.log(data);
    res.json(data);
  });
});

const Schema2 = mongoose.Schema;
const MltesttwosSchema = new Schema2({}, { strict: false });
const Mltesttwos = mongoose.model("Mltesttwo", MltesttwosSchema, "Mltesttwos");
app.get("/d2", (req, res) => {
  Mltesttwos.find({}).then((data) => {
    console.log(data);
    res.json(data);
  });
});

const Schema3 = mongoose.Schema;
const MltestthreesSchema = new Schema3({}, { strict: false });
const Mltestthrees = mongoose.model(
  "Mltestthree",
  MltestthreesSchema,
  "Mltestthrees"
);
app.get("/d3", (req, res) => {
  Mltestthrees.find({}).then((data) => {
    console.log(data);
    res.json(data);
  });
});

const Schema4 = mongoose.Schema;
const MltesttasSchema = new Schema4({}, { strict: false });
const Mltesttas = mongoose.model("Mltestta", MltesttasSchema, "Mltesttas");
app.get("/d4", (req, res) => {
  Mltesttas.find({}).then((data) => {
    console.log(data);
    res.json(data);
  });
});
//HTTP request logger
app.use(morgan("tiny"));

app.listen(PORT, console.log(`server is starting at ${PORT}`));