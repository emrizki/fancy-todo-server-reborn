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
        res.status(401).json({message: 'Please Login First'})
      }
    } else {
      res.status(401).json({message: 'Please Login First'})
    }
  } catch (error) {
    res.status(500).json({message: 'JWT not valid'})
  }
}