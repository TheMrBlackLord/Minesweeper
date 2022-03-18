const { Router } = require('express')
const adminService = require('../services/admin.services')
const { BadRequestError } = require('../errors/api.errors')
const authMiddleware = require('../middlewares/auth.middlewares')
const roleMiddleware = require('../middlewares/role.middlewares')
const { body, validationResult } = require('express-validator')

const router = Router()

router.patch('/updateUser',
   body('id').exists().isMongoId()
      .withMessage('id must be a valid MongoDB ObjectId'),
   body('updates.username').if(body('updates.username').exists())
      .trim().isLength({ min: 3, max: 15})
      .withMessage('Username must be between 3 and 15 characters long'),
   body('updates.password').if(body('updates.password').exists())
      .isLength({ min: 6})
      .withMessage('Password must be at least 6 characters long'),
   body('updates.role').if(body('updates.role').exists())
      .isIn(['user', 'admin'])
      .withMessage('Role must be either "user" or "admin"'),
   authMiddleware,
   roleMiddleware(['admin']),
   async (req, res, next) => {
      try {
         const errors = validationResult(req)
         if (!errors.isEmpty()) {
            return next(new BadRequestError('Validation error', errors.array()))
         }
         const {id, updates} = req.body
         const updatedUser = await adminService.updateUser(id, updates)
         res.status(200).json(updatedUser)
      } catch (e) {
         next(e)
      }
   }
)

module.exports = router
