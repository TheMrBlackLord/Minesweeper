const { ForbiddenError } = require('../errors/api.errors')

module.exports = function(roles) {
   return function(req, res, next) {
      if (!roles.includes(req.user.role)) {
         return next(new ForbiddenError())
      }
      next()
   }
}
