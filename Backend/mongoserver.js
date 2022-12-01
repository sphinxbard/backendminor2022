const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const app = express();
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

// app.get('/d2', (req, res) => {
//   Mltesttwos.find({}).then(data => {
//     console.log(data);
//     res.json(data);
//   });
// });

//HTTP request logger
app.use(morgan("tiny"));

app.listen(PORT, console.log(`server is starting at ${PORT}`));