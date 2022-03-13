const User = require('../models/User')
const GameData = require('../models/GameData')
const tokenService = require('./token.services') 
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
      await gameData.save()
      const userRaw = await User.create({
         username,
         password: hashedPassword,
         gameData: gameData._id
      })
      const user = new UserDTO(userRaw)
      const tokens = await tokenService.generateTokens({...user})
      await tokenService.saveToken(user.id, tokens.refreshToken)
      return {
         tokens,
         user
      }
   }
   async login(username, password) {
      const userRaw = await User.findOne({username})
      if (!userRaw) {
         throw new BadRequestError('User with such username does not exist')
      }
      const isPasswordValid = await bcrypt.compare(password, userRaw.password)
      if (!isPasswordValid) {
         throw new BadRequestError('Invalid password')
      }
      const user = new UserDTO(userRaw)
      const tokens = await tokenService.generateTokens({...user})
      await tokenService.saveToken(user.id, tokens.refreshToken)
      return {
         tokens,
         user
      }
   }
   async logout(refreshToken) {
      await tokenService.removeToken(refreshToken)
   }
}

module.exports = new AuthService()
