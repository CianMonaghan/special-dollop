const express = require("express");
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const FormData = require('form-data');
const {MongoClient} = require("mongodb");

// To connect with your MongoDB database
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017";
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if connection fails
  });
const client = new MongoClient(mongoURI);
const raceDB = client.db("races");
const raceCollection = raceDB.collection("race");

const raceSchema = new mongoose.Schema({
  name: String,
  size: String,
  speed: Number,
  Str: Number,
  Dex: Number,
  Con: Number,
  Int: Number,
  Wis: Number,
  Cha: Number,
  traits: String
});
const race = mongoose.model('race', raceSchema);

app.use(bodyParser.urlencoded({ extended: false }));
//app.set('view engine', 'ejs'); // Set EJS as the templating engine

app.get('/', async (req, res) => {
    app.use(express.static(__dirname));
    res.sendFile(path.join(__dirname,'index.html'));
});

app.post('/new', async (req, res) => {
    try {
        const race = new FormData({
            name: req.body.name,
            size: req.body.size,
            speed: req.body.speed,
            Str: req.body.Str,
            Dex: req.body.Dex,
            Con: req.body.Con,
            Int: req.body.Int,
            Wis: req.body.Wis,
            Cha: req.body.Cha,
            traits: req.body.traits
        }); // req.body contains the form data
        await raceCollection.insertOne(race);
        console.log("Data saved.")
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send("Error");
    }
});

app.post('/update',async (req, res) => {
  try {
    const raceName = new FormData({
        name : req.body.name
    })
    const foundRace = await raceCollection.findOne({ name : raceName.name })
    res.send(foundRace);
  } catch (err){
    console.error(err);
    res.send("Error");
  }
});

app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});

