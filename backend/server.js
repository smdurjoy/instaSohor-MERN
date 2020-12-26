const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

// set up express
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000   
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT} ;)`)) 

// set up mongoose
const config = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, config, (err) => {
    if(err) throw err;
    console.log('Mongodb connection established :)')
})

// set up routes
app.use('/users', require('./routes/userRoute'))
app.use('/posts', require('./routes/postRoute'))