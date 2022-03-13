class GamesDTO {
   constructor({id, difficulty, time, isWin, timestamp}) {
      this.id = id
      this.difficulty = difficulty
      this.time = time
      this.isWin = isWin
      this.timestamp = timestamp
   }
}

module.exports = GamesDTO
