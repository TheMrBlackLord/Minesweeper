const gameDataDTO = require('./gameData.dto');

class UserDTO {
   constructor({_id, username, role, createdAt, gameData}) {
      this.id = _id
      this.username = username
      this.role = role
      this.gameData = new gameDataDTO(gameData)
      this.createdAt = createdAt
   }
}

module.exports = UserDTO;
