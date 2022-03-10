const { Router } = require('express')
const authService = require('../services/auth.services')
const { body, validationResult } = require('express-validator')

const router = Router()

router.post('/register', 
   body('username').trim().isLength({ min: 3, max: 15})
      .withMessage('Username must be between 3 and 15 characters long'),
   body('password').isLength({ min: 6})
      .withMessage('Password must be at least 6 characters long'),
   async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({errors: errors.array()})
      }
      try {
         const {username, password} = req.body
         const user = await authService.register(username, password)
         res.status(201).json(user)
      } catch (e) {
         res.status(500).json({ message: e.message })
      }
   }
)

module.exports = router
