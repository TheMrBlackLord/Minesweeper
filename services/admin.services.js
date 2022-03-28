const User = require('../models/User')
const { BadRequestError } = require('../errors/api.errors')
const UserDTO = require('../dto/user.dto')
const bcrypt = require('bcrypt')

class AdminService {
   async updateUser(id, updates) {
      const user = await User.findById(id)
      if (!user) {
         throw new BadRequestError('User not found')
      }
      for (const [field, value] of Object.entries(updates)) {
         if (['username', 'password', 'role'].includes(field)) {
            if (field === 'password') {
               user[field] = await bcrypt.hash(value, 3)
            }
            else user[field] = value
         }
      }
      await user.save()
      return new UserDTO(user)
   }
}

module.exports = new AdminService()
