const router = require('express').Router()
const { WeatherController } = require('../controllers/')

router.get('/', WeatherController.currentWeather)

module.exports = router