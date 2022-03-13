const User = require('../models/User')
const Game = require('../models/Game')
const UserDTO = require('../dto/user.dto')
const { BadRequestError } = require('../errors/api.errors')

class UserService {
   async getAll() {
      const users = await User.find().populate({
         populate: 'gameData',
         path: 'gameData',
         populate: {
            path: 'games',
         }
      })
      return users.map(user => new UserDTO(user))
   }
   async getOne(id) {
      const user = await User.findById(id)
      return new UserDTO(user)
   }
   async _addNewGame(id, difficulty, time, isWin) {
      const user = await User.findById(id)
      if (!user) {
         throw new BadRequestError('User not found')
      }
      const game = await Game.create({
         difficulty,
         time,
         isWin
      })
      const populatedUser = await user.populate('gameData')
      populatedUser.gameData.games.push(game._id)
      return populatedUser
   }
   async win(id, difficulty, time) {
      const user = await this._addNewGame(id, difficulty, time, true)
      user.gameData.totalWins++
      if (time < user.gameData.personalBest) {
         user.gameData.personalBest = time
      }
      await user.gameData.save()
      return true
   }
   async defeat(id, difficulty, time) {
      const user = await this._addNewGame(id, difficulty, time, false)
      await user.gameData.save()
      return true
   }
}

module.exports = new UserService()
