const axios = require('axios');

class WeatherController {
  static async currentWeather(req, res) {
    try {
      const response = await axios({
        method: 'get',
        url: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}=Jakarta`,
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', errorMessage: error.message });
    }
  }
}

module.exports = WeatherController;
