const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { insertUser } = require('../users/users-model')

router.post('/register', (req, res, next) => {
  const user = req.body
  const hash = bcrypt.hashSync(user.password, 8)
  user.password = hash

  insertUser(user)
    .then(user => res.status(201).json(user))
    .catch(next)
})

router.post('/login', (req, res, next) => {
  
})

module.exports = router