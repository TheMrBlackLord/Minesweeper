const { Router } = require('express')
const authService = require('../services/auth.services')
const { body, validationResult } = require('express-validator')
const { BadRequestError, UnauthorizedError } = require('../errors/api.errors')

const cookieAge = 1000 * 60 * 60 * 24 * 15
const router = Router()

router.post('/register', 
   body('username').trim().isLength({ min: 3, max: 15})
      .withMessage('Username must be between 3 and 15 characters long'),
   body('password').isLength({ min: 6})
      .withMessage('Password must be at least 6 characters long'),
   async (req, res, next) => {
      /*
      #swagger.path = '/auth/register'
      #swagger.tags = ['Auth']
      #swagger.operationId = 'register'
      #swagger.description = 'Register a new user'
      #swagger.requestBody = {
         description: 'Auth payload',
         required: true,
         schema: {$ref: '#/definitions/AuthPayload'}
      }
      #swagger.responses[201] = {
            description: 'User successfully created.',
            schema: { $ref: '#/definitions/SuccessAuth' }
      }
      #swagger.responses[400] = {
            description: 'Validation error or user already exists.',
            schema: { $ref: '#/definitions/Error' }
      }
      #swagger.responses[500] = {
            description: 'Unexpected error.',
            schema: { $ref: '#/definitions/Error' }
      }
      */
      const errors = validationResult(req);
      try {
         if (!errors.isEmpty()) {
            return next(
               new BadRequestError("Validation error", errors.array())
            );
         }
         const { username, password } = req.body;
         const user = await authService.register(username, password);
         res.cookie("refreshToken", user.tokens.refreshToken, {
            maxAge: cookieAge,
            httpOnly: true,
         });
         res.status(201).json(user);
      } catch (e) {
         next(e);
      }
   }
)

router.post('/login', async (req, res, next) => {
   /*
      #swagger.path = '/auth/login'
      #swagger.tags = ['Auth']
      #swagger.operationId = 'login'
      #swagger.description = 'Login user'
      #swagger.requestBody = {
         description: 'Auth payload',
         required: true,
         schema: {$ref: '#/definitions/AuthPayload'}
      }
      #swagger.responses[200] = {
            description: 'User successfully logged in.',
            schema: { $ref: '#/definitions/SuccessAuth' }
      }
      #swagger.responses[400] = {
            description: 'Invalid auth payload.',
            schema: { $ref: '#/definitions/Error' }
      }
      #swagger.responses[500] = {
            description: 'Unexpected error.',
            schema: { $ref: '#/definitions/Error' }
      }
      */
   try {
      const { username, password } = req.body;
      const user = await authService.login(username, password);
      res.cookie("refreshToken", user.tokens.refreshToken, {
         maxAge: cookieAge,
         httpOnly: true,
      });
      res.json(user);
   } catch (e) {
      next(e);
   }
})

router.post('/logout', async (req, res, next) => {
   /*
      #swagger.path = '/auth/logout'
      #swagger.security = [{
         "bearerAuth": []
      }]
      #swagger.tags = ['Auth']
      #swagger.operationId = 'logout'
      #swagger.description = 'Logout user'
      #swagger.parameters['refreshToken'] = {
         description: 'Refresh token',
         in: 'cookie',
         required: true,
         type: 'string'
      }
      #swagger.responses[200] = {
            description: 'User successfully logged out.',
            schema: { $ref: '#/definitions/SuccessAuth' }
      }
      #swagger.responses[401] = {
            description: 'Refresh token is invalid.',
            schema: { $ref: '#/definitions/Error' }
      }
      #swagger.responses[500] = {
            description: 'Unexpected error.',
            schema: { $ref: '#/definitions/Error' }
      }
      */
   try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
         return next(new UnauthorizedError());
      }
      const token = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
   } catch (e) {
      next(e);
   }
})

router.post('/refresh', async (req, res, next) => {
   /*
      #swagger.path = '/auth/refresh'
      #swagger.tags = ['Auth']
      #swagger.security = [{
         "bearerAuth": []
      }]
      #swagger.operationId = 'refresh'
      #swagger.description = 'Refresh tokens'
      #swagger.parameters['refreshToken'] = {
         description: 'Refresh token',
         in: 'cookie',
         required: true,
         type: 'string'
      }
      #swagger.responses[200] = {
            description: 'Token successfully refreshed.',
            schema: { $ref: '#/definitions/SuccessAuth' }
      }
      #swagger.responses[401] = {
            description: 'Refresh token is invalid.',
            schema: { $ref: '#/definitions/Error' }
      }
      #swagger.responses[500] = {
            description: 'Unexpected error.',
            schema: { $ref: '#/definitions/Error' }
      }
      */
   try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      res.cookie("refreshToken", userData.tokens.refreshToken, {
         maxAge: cookieAge,
         httpOnly: true,
      });
      res.json(userData);
   } catch (e) {
      next(e);
   }
})

module.exports = router
