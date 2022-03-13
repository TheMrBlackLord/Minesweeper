const {
   Router
} = require('express')
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

module.exports = router
