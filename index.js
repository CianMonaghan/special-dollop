const express = require("express");
const path = require('path');
const app = express();
const port = 3000;

// To connect with your MongoDB database
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/";
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

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit-form', async (req, res) => {
    try {
        const form = document.querySelector("race_input");
        const race = new FormData({
            form
        });
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
