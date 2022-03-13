const { Schema, model, Types } = require('mongoose')

const gameData = new Schema({
   personalBest: {
      type: Number,
      default: Infinity
   },
   games: [{
      type: Types.ObjectId,
      ref: 'Game',
      default: []
   }],
   totalWins: {
      type: Number,
      default: 0
   }
})

module.exports = model('GameData', gameData)
