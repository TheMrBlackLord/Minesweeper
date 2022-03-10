const { Schema, model } = require('mongoose')

const gameData = new Schema({
   personalBest: {
      type: Number,
      default: 0
   },
   games: [{
      type: Date,
      default: []
   }],
   gamesPlayed: {
      easy: {
         type: Number,
         default: 0
      },
      medium: {
         type: Number,
         default: 0
      },
      hard: {
         type: Number,
         default: 0
      }
   },
   gamesWon: {
      easy: {
         type: Number,
         default: 0
      },
      medium: {
         type: Number,
         default: 0
      },
      hard: {
         type: Number,
         default: 0
      }
   },
})

module.exports = model('GameData', gameData)
