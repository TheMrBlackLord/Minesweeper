const { Router } = require('express')
const userService = require('../services/user.services')
const authMiddleware = require('../middlewares/auth.middlewares')

const router = Router()

router.get('/all', async (req, res, next) => {
   try {
      const users = await userService.getAll()
      res.json(users)
   } catch (e) {
      next(e)
   }
})

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
