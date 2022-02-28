const router = require('express').Router()
const bcrypt = require('bcryptjs')
const generateToken = require('../middleware/generateToken')
const { checkUserBody, checkUserExists, validateUser } = require('../middleware/auth-middleware')
const { insertUser } = require('../users/users-model')

router.post('/register', checkUserBody, checkUserExists, (req, res, next) => {
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash

  insertUser(user)
    .then(user => res.status(201).json(user))
    .catch(next)
})

router.post('/login', checkUserBody, validateUser, (req, res, next) => {
  if(bcrypt.compareSync(req.body.password, req.user.password)) {
    const token = generateToken(req.user)
    res.json({ message:`welcome ${req.user.username}!`, token })
  } else {
    next({ status:401, message:'invalid credentials' })
  }
})

module.exports = router