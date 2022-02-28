const jwt = require('jsonwebtoken')

const generateToken = user => {
  const payload = {
    subject: user.user_id,
    username: user.username
  }

  return jwt.sign(payload, process.env.SECRET || 'this is a good secret', { expiresIn:'1d' })
}

module.exports = generateToken