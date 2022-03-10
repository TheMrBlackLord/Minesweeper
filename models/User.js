const { Schema, model, Types } = require('mongoose')

const User = new Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   password: {
      type: String,
      required: true
   },
   role: {
      type: Types.ObjectId,
      ref: 'Role',
      required: true
   },
   gameData: {
      type: Types.ObjectId,
      ref: 'GameData',
      required: true
   }
})

module.exports = model('User', User)
