const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

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
          res.status(200).json({ access_token });
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
}

module.exports = UserController;
