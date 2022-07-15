const { Router } = require('express')
const userService = require('../services/user.services')
const authMiddleware = require('../middlewares/auth.middlewares')
const { param, validationResult } = require('express-validator')
const { BadRequestError } = require('../errors/api.errors')

const router = Router()

router.get('/all', async (req, res, next) => {
   /*
      #swagger.path = '/user/all'
      #swagger.tags = ['User']
      #swagger.operationId = 'all_users'
      #swagger.description = 'Get all users'
      #swagger.responses[200] = {
            description: 'Get all users.',
            schema: [{ $ref: '#/definitions/User' }]
      }
      #swagger.responses[500] = {
            description: 'Unexpected error.',
            schema: { $ref: '#/definitions/Error' }
      }
      */
   try {
      const users = await userService.getAll();
      res.json(users);
   } catch (e) {
      next(e);
   }
})

router.get('/me', authMiddleware, async (req, res, next) => {
   /*
      #swagger.path = '/user/me'
      #swagger.tags = ['User']
      #swagger.security = [{
         "bearerAuth": []
      }]
      #swagger.operationId = 'me'
      #swagger.description = 'Get current user'
      #swagger.parameters['authorization'] = {
         description: 'Authorization header',
         in: 'header',
         required: true,
         type: 'Bearer <jwt acess token>'
      }
      #swagger.responses[200] = {
            description: 'Get current user.',
            schema: { $ref: '#/definitions/User' }
      }
      #swagger.responses[500] = {
            description: 'Unexpected error.',
            schema: { $ref: '#/definitions/Error' }
      }
      */
   try {
      const id = req.user.id;
      const user = await userService.getOne(id);
      res.json(user);
   } catch (e) {
      next(e);
   }
})

router.get('/:id',
   param('id').isMongoId()
      .withMessage('id must be a valid MongoDB ObjectId'),
   async (req, res, next) => {
      /*
      #swagger.path = '/user/{id}'
      #swagger.tags = ['User']
      #swagger.operationId = 'user_by_id'
      #swagger.description = 'Get user by id'
      #swagger.parameters['id'] = {
         description: 'MongoDB id',
         in: 'query',
         required: true,
         type: 'string'
      }
      #swagger.responses[200] = {
            description: 'Get user by id.',
            schema: { $ref: '#/definitions/User' }
      }
      #swagger.responses[400] = {
            description: 'Invalid id parameter.',
            schema: { $ref: '#/definitions/Error' }
      }
      #swagger.responses[500] = {
            description: 'Unexpected error.',
            schema: { $ref: '#/definitions/Error' }
      }
      */
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return next(
               new BadRequestError("Validation error", errors.array())
            );
         }
         const id = req.params.id;
         const user = await userService.getOne(id);
         res.json(user);
      } catch (e) {
         next(e);
      }
   }
)

router.get('/gameData/:id',
   param('id').isMongoId()
      .withMessage('id must be a valid MongoDB ObjectId'),
   async (req, res, next) => {
      /*
      #swagger.path = '/user/gameData/{id}'
      #swagger.tags = ['User']
      #swagger.operationId = 'gameData'
      #swagger.description = 'Get user game data'
      #swagger.parameters['id'] = {
         description: 'MongoDB id',
         in: 'query',
         required: true,
         type: 'string'
      }
      #swagger.responses[200] = {
            description: 'Get current user.',
            schema: { $ref: '#/definitions/GameData' }
      }
      #swagger.responses[400] = {
            description: 'Invalid id parameter.',
            schema: { $ref: '#/definitions/Error' }
      }
      #swagger.responses[500] = {
            description: 'Unexpected error.',
            schema: { $ref: '#/definitions/Error' }
      }
      */
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return next(
               new BadRequestError("Validation error", errors.array())
            );
         }
         const id = req.params.id;
         const gameData = await userService.getGameData(id);
         res.json(gameData);
      } catch (e) {
         next(e);
      }
   }
)

router.post('/game/win', authMiddleware, async (req, res, next) => {
   /*
      #swagger.path = '/user/game/win'
      #swagger.tags = ['User']
      #swagger.security = [{
         "bearerAuth": []
      }]
      #swagger.operationId = 'winGame'
      #swagger.description = 'Add win game'
      #swagger.parameters['authorization'] = {
         description: 'Authorization header',
         in: 'header',
         required: true,
         type: 'Bearer <jwt acess token>'
      }
      #swagger.requestBody = {
         description: 'Win game data',
         required: true,
         schema: {$ref: '#/definitions/FinishGame'}
      }
      #swagger.responses[200] = {
            description: 'Win successfully added.',
      }
      #swagger.responses[500] = {
            description: 'Unexpected error.',
            schema: { $ref: '#/definitions/Error' }
      }
      */
   try {
      const id = req.user.id;
      const { difficulty, time } = req.body;
      const response = await userService.win(id, difficulty, time);
      res.json(response);
   } catch (e) {
      next(e);
   }
})
router.post('/game/defeat', authMiddleware, async (req, res, next) => {
   /*
      #swagger.path = '/user/game/defeat'
      #swagger.tags = ['User']
      #swagger.security = [{
         "bearerAuth": []
      }]
      #swagger.operationId = 'defeatGame'
      #swagger.description = 'Add lose game'
      #swagger.parameters['authorization'] = {
         description: 'Authorization header',
         in: 'header',
         required: true,
         type: 'Bearer <jwt acess token>'
      }
      #swagger.requestBody = {
         description: 'Lose game data',
         required: true,
         schema: {$ref: '#/definitions/FinishGame'}
      }
      #swagger.responses[200] = {
            description: 'Defeat successfully added.',
      }
      #swagger.responses[500] = {
            description: 'Unexpected error.',
            schema: { $ref: '#/definitions/Error' }
      }
      */
   try {
      const id = req.user.id;
      const { difficulty, time } = req.body;
      const response = await userService.defeat(id, difficulty, time);
      res.json(response);
   } catch (e) {
      next(e);
   }
})

module.exports = router
