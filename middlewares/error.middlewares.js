const { ApiError } = require('../errors/api.errors')

module.exports = function (error, _, res, _) {
   if (error instanceof ApiError) {
      return res.status(error.status).json({
         message: error.message,
         errors: error.errors
      })
   }
   console.error(error)
   return res.status(500).json({
      message: 'Unexpected error',
   })

}
