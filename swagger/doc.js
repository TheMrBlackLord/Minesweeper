module.exports = {
   info: {
      title: "Minesweeper API",
      description: "API for Minesweeper game",
   },
   definitions: {
      User: {
         $id: 'MongoDB id',
         $username: 'username',
         $role: { '@enum': ['user', 'admin'], 'default': 'user' },
         $createdAt: new Date().toISOString(),
      },
      GameData: {
         $id: 'MongoDB id',
         $personalBest: Number.MAX_SAFE_INTEGER,
         $games: [{$ref: '#/definitions/Game'}],
         $totalWins: 0,
         $totalDefeats: 0
      },
      Game: {
         id: 'MongoDB id',
         timestamp: new Date().toISOString(),
         $difficulty: { '@enum': ['easy', 'medium', 'hard'] },
         $time: 0,
         $isWin: false
      },
      AuthPayload: {
         $username: 'username',
         $password: 'password',
      },
      SuccessAuth: {
         tokens: {$ref: '#/definitions/Tokens'},
         user: {$ref: '#/definitions/User'}
      },
      Tokens: {
         $refreshToken: 'jwt refreshToken',
         $accessToken: 'jwt accessToken',
      },
      Error: {
         $message: 'error message',
         errors: []
      },
      FinishGame: {
         $difficulty: { '@enum': ['easy', 'medium', 'hard'] },
         $time: 0
      },
      UpdateUser: {
         $id: 'MongoDB id',
         $updates: {
            username: 'username',
            password: 'password',
            role: { '@enum': ['user', 'admin']}
         }
      }
   },
   securityDefinitions: {
      bearerAuth: {
         type: 'http',
         scheme: 'bearer',
         bearerFormat: 'JWT'
      }
   },
   tags: [
      {
         name: 'Auth',
         description: 'Auth operations'
      },
      {
         name: 'User',
         description: 'User operations'
      },
      {
         name: 'Admin',
         description: 'Admin operations'
      }
   ],
   host: "localhost:5000/api",
   schemes: ["http"],
};
