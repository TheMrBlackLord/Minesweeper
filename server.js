require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.routes')
const globalRouter = require('./routes/global.routes')
const errorMiddleware = require('./middlewares/error.middlewares')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/', globalRouter)
app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI)
   .then(() => console.log('Connected to MongoDB'))

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
