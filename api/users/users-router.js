const router = require('express').Router()

const { getAllUsers } = require('./users-model')

router.get('/', async (req, res) => {
  res.json(await getAllUsers())
})

module.exports = router