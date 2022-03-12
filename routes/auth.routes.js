const { Router } = require('express')
const authService = require('../services/auth.services')
const { body, validationResult } = require('express-validator')
const { BadRequestError } = require('../errors/api.errors')

const router = Router()

router.post('/register', 
   body('username').trim().isLength({ min: 3, max: 15})
      .withMessage('Username must be between 3 and 15 characters long'),
   body('password').isLength({ min: 6})
      .withMessage('Password must be at least 6 characters long'),
   async (req, res, next) => {
      const errors = validationResult(req)
      try {
         if (!errors.isEmpty()) {
            return next(new BadRequestError('Validation error', errors.array()))
         }
         const {username, password} = req.body
         const user = await authService.register(username, password)
         res.status(201).json(user)
      } catch (e) {
         next(e)
      }
   }
)

module.exports = router
