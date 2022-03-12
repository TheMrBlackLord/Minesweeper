const User = require('../models/User')
const GameData = require('../models/GameData')
const UserDTO = require('../dto/user.dto')
const { BadRequestError } = require('../errors/api.errors')

const bcrypt = require('bcrypt')

class AuthService {
   async register(username, password) {
      const candidate = await User.findOne({ username })
      if (candidate) {
         throw new BadRequestError('User with such username already exists')
      }
      const hashedPassword = await bcrypt.hash(password, 3)
      const gameData = new GameData()
      const user = await User.create({
         username,
         password: hashedPassword,
         gameData: gameData._id
      })
      await gameData.save()
      return new UserDTO(user)
   }
}

module.exports = new AuthService()
