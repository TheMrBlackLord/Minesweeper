const gamesDTO = require('./games.dto');

class GameDataDTO {
   constructor({id, personalBest, totalWins, totalDefeats, games}) {
      this.id = id
      this.personalBest = personalBest
      this.totalWins = totalWins
      this.totalDefeats = totalDefeats
      this.games = games.map(game => new gamesDTO(game))
   }
}

module.exports = GameDataDTO
