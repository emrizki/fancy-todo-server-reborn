const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static async register(req, res, next) {
    try {
      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
      };

      const userData = await User.create(newUser);
      const response = {
        id: userData.id,
        email: userData.email,
      };
      res.status(201).json(response);
    } catch (error) {
      if (error.errors[0].path === 'email') {
        next({name: 'email', message: error.errors[0].message })
      } else if (error.errors[0].path === 'password') {
        next({name: 'password', message: error.errors[0].message})
      } else {
        next(error)
      }
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        const match = comparePassword(password, user.password);
        if (match) {
          const access_token = generateToken({
            id: user.id,
            email: user.email,
          });
          res.status(200).json({ access_token, full_name: user.full_name });
        } else {
          next({name: 'passwordNotMatch'})
        }
      } else {
        next({name: 'emailNotValid'})
      }
    } catch (error) {
      next(error)
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
      })

      const payload = ticket.getPayload()
      const userLogin = await User.findOne({
        where: {
          email: payload.email
        }
      })

      if(userLogin) {
        const access_token = generateToken({ id: userLogin.id, email: userLogin.email})
        if (userLogin.last_name === null) {
          res.status(200).json({ access_token, full_name: userLogin.first_name })
        } else {
          res.status(200).json({ access_token, full_name: userLogin.full_name })
        }
      } else {
        const first_name = payload.given_name
        const last_name = payload.family_name
        const email = payload.email
        const password = Math.floor(100000 + Math.random() * 900000).toString()
        const userRegister = await User.create({
         first_name,
         last_name,
         email,
         password
        })

        const access_token = generateToken({ id: userRegister.id, email: userRegister.email })
        if (userRegister.last_name === null) {
          res.status(200).json({ access_token, full_name: userRegister.first_name })
        } else {
          res.status(200).json({ access_token, full_name: userRegister.full_name })
        }
      }

    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = UserController;
