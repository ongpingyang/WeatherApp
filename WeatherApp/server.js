// Dependencies install
// 1. Axios - call API's that we need, similar to fetch
// 2. Express.js - easier to set up server than default Node HTTP module
//    - Node.js is a run-time environment created to run JavaScript on the server side.
//    - Express.js is a framework for Node.js, so in order to use it, you will use Node.js anyway.
//    - Express.js will help you organize your application better. It provides many features which will speed up the development.
// 3. --save-dev dotenv
// 4. Nodemon -automatically refresh server 

// load in environment variable
if (process.env.NODE_ENV !== 'production') {
    // load from .env file
    require('dotenv').config();
}

// load darksky api key from .env file
const darksky_API_key = process.env.darksky_API_key
const mongoDB_URI = process.env.mongoDB_URI

const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')

// set up server
const morgan = require('morgan')
const port = process.env.port || 3000

const app = express()
app.use(express.json()) // use JSON as send JSON to server
app.use(express.static('public')) // set up static folder

// Route - put in backend to prevent API key exposed for safer approach
app.post('/weather', (req, res) => {
    const url = `https://api.darksky.net/forecast/${darksky_API_key}/${req.body.latitude},${req.body.longitude}?units=auto`
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data.currently))
}) 

// connect to Mongo
mongoose.connect(mongoDB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

// Schema
const Schema = mongoose.Schema({
    location: String,
    latitude: String,
    longitude: String,
    date: {
        type: String,
        default: Date.now() 
    },   
})

// Model
const WeatherData = mongoose.model('weather', Schema)

const data = {
    location: 'testing',
    latitude: '10',
    longitude: '8',
}

const newWeatherData = new WeatherData(data); // instance of the model

newWeatherData.save((error) => {
    if (error) {
        console.log('Ooops, something happened');
    } else {
        console.log('Data has been saved!')
    }
})


app.listen(port, () => {
    console.log(`Server started at ${port}`);
})