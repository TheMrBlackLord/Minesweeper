const { Schema, model } = require('mongoose')

const Game = new Schema({
   timestamp: {
      type: Date,
      default: Date.now
   },
   difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true
   },
   time: {
      type: Number,
      required: true
   },
   isWin: {
      type: Boolean,
      required: true
   }
})

module.exports = model('Game', Game)
