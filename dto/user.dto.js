class UserDTO {
   constructor({_id, username, role, createdAt}) {
      this.id = _id;
      this.username = username;
      this.role = role;
      this.createdAt = createdAt;
   }
}

module.exports = UserDTO;
