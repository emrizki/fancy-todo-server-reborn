const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

const generateToken = (user) => {
  const token = jwt.sign(user, SECRET_KEY)
  return token
}

const verifyToken = (access_token) => {
  const token = jwt.verify(access_token, SECRET_KEY)
  return token
}

module.exports = {
  generateToken,
  verifyToken
}