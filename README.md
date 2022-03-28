# Minesweeper

Vue based classic Minesweeper with registration and user roles. The stack of technologies used: `MongoDB`, `Exress.js`, `Vue.js`, `Node.js`

---

## Install

```
npm install
cd client
npm install
```

## Start
```
npm start dev
```
## API endpoints
All endpoints starts with `/api/`

Auth
-
- POST `/auth/register` - register new user

   - Params: `username` and `password`

   - Return: object with properties `tokens` (`accessToken` and `refreshToken`) and `user` (`id`, `username`, `role`, `createdAt`)

- POST `/auth/login` - login user

   - Params: `username` and `password`

   - Return: same as in `/auth/register`

- POST `/auth/logout` - remove refresh token from DB

- POST `/auth/refresh` - refresh access token if it expires

User
-
- GET `/user/all` - get all users

   - Return: `Array` of objects (`id`, `username`, `role`, `createdAt`)

- GET `/user/me` - get authenticated user

   - Require: header `Authorization: Bearer <access token>`

   - Return: `Object` (`id`, `username`, `role`, `createdAt`)

- GET `/user/<id>` - get user by id

   - Params: `<id>` - MongoDB id of user

   - Return: `Object` (`id`, `username`, `role`, `createdAt`)

- GET `/user/gameData/<id>` - get data of played games 

   - Params: `<id>` - MongoDB id of user

   - Return: `Array` of objects (`id`, `personalBest`, `totalWins`, `totalDefeats`, `games`: `Array` of objects (`id`, `difficulty`, `isWin`, `time`, `timestamp`))

- POST `/user/game/win` - add win to DB

   - Require: header `Authorization: Bearer <access token>`

- POST `/user/game/defeat` - add defeat to DB

   - Require: header `Authorization: Bearer <access token>`

Admin
-

- PATCH `/admin/updateUser` - update some user params

   - Require: header `Authorization: Bearer <access token>` and Use must have role `admin`

   - Params: `id` - MongoDB id of user, updates: `Object` which can contain only field `username`, `password`, `role`
   
   - Return: `Object` (`id`, `username`, `role`, `createdAt`)
