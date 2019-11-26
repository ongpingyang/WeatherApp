const express = require('express')
const router = express.Router()
const Weather = require('../models/weatherModel')

// getting all
router.get('/', async (req, res) => {
    try {
        const weather = await Weather.find()
        res.json(weather)
    } catch (err) {
        res.status(500).json({ message : err.message })
    }
})

// getting one
router.get('/:id', getWeatherData, (req, res) => {
    res.send(res.weather.id)
})

// creating one
router.post('/weatherData', async (req, res) => {
    const weather = new Weather({
        location: req.body.location,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })
    try {
        const newWeather = await weather.save()
        res.status(201).json(newWeather)
    } catch (err) {
        res.status(400).json({ message : err.message })
    }
})

// deleting one
router.delete('/', (req, res) => {
    
})

async function getWeatherData(req, res, next) {
    let weather
    try {
        weather = await Weather.findById(req.params.id)
        if (weather = null) {
            return res.status(400).json({ message : 'cannot find data' })
        }
    } catch {
        return res.status(500).json({ message : err.message })
    }
    res.weather = weather
    next()
}

module.exports = router