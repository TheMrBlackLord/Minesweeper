require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.routes')

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRouter)
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI)
   .then(() => console.log('Connected to MongoDB'))

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
