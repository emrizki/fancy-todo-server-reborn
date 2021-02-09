const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

module.exports = async (req, res, next) => {
  try {
    const { access_token } = req.headers
    if(access_token) {
      const decoded = verifyToken(access_token)
      req.user = decoded
      const user = await User.findByPk(decoded.id)
      if(user) {
        next()
      } else {
        next({name: 'authentication'})
      }
    } else {
      next({name: 'needJWT'})
    }
  } catch (error) {
    next(error)
  }
}