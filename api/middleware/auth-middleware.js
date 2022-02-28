const { getUserBy } = require('../users/users-model')

const checkUserBody = (req, res, next) => {
  if(!req.body.username || !req.body.password) {
    next({ status:400, message:'username and password are required'})
  } else {
    next()
  }
}

const checkUserExists = async (req, res, next) => {
  const user = await getUserBy({ username: req.body.username })

  if(user) {
    next({ status:400, message:'username taken'})
  } else {
    next()
  }
}

const validateUser = async (req, res, next) => {
  const user = await getUserBy({ username: req.body.username })

  if(!user) {
    next({ status:401, message:'invalid username'})
  } else {
    req.user = user
    next()
  }
}

module.exports = {
  checkUserBody,
  checkUserExists,
  validateUser
}