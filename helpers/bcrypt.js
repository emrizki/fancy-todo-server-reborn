const bcrypt = require('bcryptjs')

const hashPassword = (userPassword) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(userPassword, salt)

  return hash
}

const comparePassword = ((userPassword, dbPassword) => {
  const checkPassword = bcrypt.compareSync(userPassword, dbPassword)

  return checkPassword
})

module.exports = {
  hashPassword,
  comparePassword
}