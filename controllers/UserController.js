const { User } = require('../models')

class UserController {
  static async register(req, res) {
    try {
      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
      }

      const userData = await User.create(newUser)
      const response = {
        id: userData.id,
        email: userData.email
      }
      res.status(201).json(response)
    } catch (error) {
      if(error.errors[0].path === 'email') {
        res.status(400).json({message: error.errors[0].message})
      } else if(error.errors[0].path === 'password') {
        res.status(400).json({message: error.errors[0].message})
      } else {
        res.status(500).json(error)
      }
    }
  }



}

module.exports = UserController