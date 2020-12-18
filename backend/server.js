const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000   
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT} ;)`)) 

const config = {useNewUrlParser: true, useUnifiedTopology: true}
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, config, () => console.log('Mongodb connection established :)'))