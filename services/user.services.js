const User = require('../models/User')
const userDTO = require('../dto/user.dto')

class UserService {
   async getAll() {
      const users = await User.find()
      return users.map(user => new userDTO(user))
   }
}

module.exports = new UserService()
