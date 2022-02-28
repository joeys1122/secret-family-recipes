const router = require('express').Router()

const { getAllUsers, insertUser } = require('./users-model')

router.get('/', async (req, res) => {
  res.json(await getAllUsers())
})

router.post('/', async (req, res) => {
  res.status(201).json(await insertUser(req.body))
})

module.exports = router