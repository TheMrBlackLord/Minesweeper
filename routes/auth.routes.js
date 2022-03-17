const { Router } = require('express')
const authService = require('../services/auth.services')
const { body, validationResult } = require('express-validator')
const { BadRequestError, UnauthorizedError } = require('../errors/api.errors')

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

router.post('/login', async (req, res, next) => {
   try {
      const {username, password} = req.body
      const user = await authService.login(username, password)
      res.cookie('refreshToken', user.tokens.refreshToken, {
         maxAge: 1000 * 60 * 60 * 24 * 15,
         httpOnly: true
      })
      res.json(user)
   } catch (e) {
      next(e)
   }
})

router.post('/logout', async (req, res, next) => {
   try {
      const {refreshToken} = req.cookies
      if (!refreshToken) {
         return next(new UnauthorizedError())
      }
      const token = await authService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
   } catch (e) {
      next(e)
   }
})

module.exports = router
