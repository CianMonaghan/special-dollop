const express = require("express");
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


// To connect with your MongoDB database
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/races/race";
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if connection fails
  });

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
    res.sendFile(path.join(__dirname,'index.html'));
    // try {
    //         const items = await Item.find({}); // Fetch all items from MongoDB
    //         res.render('index', { items: items }); // Render 'index.ejs' and pass data
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Error fetching data');
    //     }
});

app.post('/new', async (req, res) => {
    try {
        //const form = document.getElementById("race_input");
        //const race = new FormData({
          //form
          // name: req.body.name,
          // size: req.body.size,
          // speed: req.body.speed,
          // Str: req.body.Str,
          // Dex: req.body.Dex,
          // Con: req.body.Con,
          // Int: req.body.Int,
          // Wis: req.body.Wis,
          // Cha: req.body.Cha,
          // traits: req.body.traits
        //});
        await race.save();
        console.log("Data saved.")
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.send("Error");
    }
});

app.listen(port, () => {
    console.log(`Express server listening at http://localhost:${port}`);
});

