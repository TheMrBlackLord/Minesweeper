require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI)

app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
