class ApiError extends Error {
   constructor(message, status, errors=[]) {
      super(message)
      this.status = status
      this.errors = errors
   }
}
class UnauthorizedError extends ApiError {
   constructor() {
      super('Unauthorized', 401)
   }
}

class ForbiddenError extends ApiError {
   constructor() {
      super('Forbidden', 403)
   }
}

class NotFoundError extends ApiError {
   constructor() {
      super('Not found', 404)
   }
}

class BadRequestError extends ApiError {
   constructor(message, errors=[]) {
      super(message, 400, errors)
   }
}

module.exports = {
   ApiError,
   UnauthorizedError,
   ForbiddenError,
   NotFoundError,
   BadRequestError  
}
