const { Router } = require('express')
const userService = require('../services/user.services')
const authMiddleware = require('../middlewares/auth.middlewares')
const { body, validationResult } = require('express-validator')
const { BadRequestError } = require('../errors/api.errors')

const router = Router()

router.get('/all', async (req, res, next) => {
   try {
      const users = await userService.getAll()
      res.json(users)
   } catch (e) {
      next(e)
   }
})

router.get('/me', authMiddleware, async (req, res, next) => {
   try {
      const id = req.user.id
      const user = await userService.getOne(id)
      res.json(user)
   } catch (e) {
      next(e)
   }
})

router.get('/',
   body('id').isMongoId()
      .withMessage('id must be a valid MongoDB ObjectId'),
   async (req, res, next) => {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(new BadRequestError('Validation error', errors.array()))
         }
         const id = req.body.id
         const user = await userService.getOne(id)
         res.json(user)
      } catch (e) {
         next(e)
      }
   }
)

router.get('/gameData',
   body('id').isMongoId()
      .withMessage('id must be a valid MongoDB ObjectId'),
   async (req, res, next) => {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(new BadRequestError('Validation error', errors.array()))
         }
         const id = req.body.id
         const gameData = await userService.getGameData(id)
         res.json(gameData)
      } catch (e) {
         next(e)
      }
   }
)

router.post('/game/win', authMiddleware, async (req, res, next) => {
   try {
      const id = req.user.id
      const {difficulty, time} = req.body
      const response = await userService.win(id, difficulty, time)
      res.json(response)
   } catch (e) {
      next(e)
   }
})
router.post('/game/defeat', authMiddleware, async (req, res, next) => {
   try {
      const id = req.user.id
      const {difficulty, time} = req.body
      const response = await userService.defeat(id, difficulty, time)
      res.json(response)
   } catch (e) {
      next(e)
   }
})

module.exports = router
