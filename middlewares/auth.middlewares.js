const { UnauthorizedError } = require('../errors/api.errors')
const tokenService = require('../services/token.services')

module.exports = function (req, _, next) {
   try {
      const authHeader = req.headers.authorization
      if (!authHeader) {
         return next(new UnauthorizedError())
      }

      const accessToken = authHeader.split(' ')[1]
      if (!accessToken) {
         return next(new UnauthorizedError())
      }

      const user = tokenService.validateAccessToken(accessToken)
      if (!user) {
         return next(new UnauthorizedError())
      }
      req.user = user
      next()
   } catch (e) {
      next(e)
   }
}
