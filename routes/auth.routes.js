const { Router } = require('express')
const User = require('../models/User')
const Role = require('../models/Role')
const GameData = require('../models/GameData')

const router = Router()

router.post('/register', async (req, res) => {
   const role = new Role({ name: 'user' })
   const gameData = new GameData()
   const user = new User({
      username: 'test',
      password: 'test',
      role,
      gameData
   })
   const savedUser = await user.save()
   res.json({savedUser})
})

module.exports = router
