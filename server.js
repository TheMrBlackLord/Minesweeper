require('dotenv-flow').config()
const fs = require('fs');
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const adminRouter = require('./routes/admin.routes')
const globalRouter = require('./routes/global.routes')
const errorMiddleware = require('./middlewares/error.middlewares')
const swaggerUi = require('swagger-ui-express')

const app = express()
const swaggerFile = JSON.parse(fs.readFileSync("./swagger/openAPI.json"));

app.use(express.json())
app.use(cookieParser())
app.use(cors({
   origin: process.env.CLIENT_ORIGIN,
   credentials: true
}))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/admin', adminRouter)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/', globalRouter)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI)
   .then(() => console.log('Connected to MongoDB'))

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
