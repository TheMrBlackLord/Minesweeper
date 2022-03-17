const jwt = require('jsonwebtoken')
const Token = require('../models/Token')

class TokenService{
   generateTokens(payload) {
      const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'})
      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '15d'})
      return {
         accessToken,
         refreshToken
      }
   }
   async saveToken(owner, refreshToken) {
      await Token.findOneAndUpdate({owner}, {refreshToken}, {upsert: true})
   }
   validateAccessToken(token) {
      try {
         return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      } catch (e) {
         return null
      }
   }
   validateRefreshToken(token) {
      try {
         return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      } catch (e) {
         return null
      }
   }
   async removeToken(refreshToken) {
      return await Token.deleteOne({refreshToken})
   }
   async findToken(refreshToken) {
      return await Token.findOne({refreshToken})
   }
}

module.exports = new TokenService()
