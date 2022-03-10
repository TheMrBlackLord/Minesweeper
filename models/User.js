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
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
   },
   gameData: {
      type: Types.ObjectId,
      ref: 'GameData',
      required: true
   }
}, {timestamps: { createdAt: true, updatedAt: false }})

module.exports = model('User', User)
