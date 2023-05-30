const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

// set up express
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`Server is up and running on port ${PORT} ;)`))

// set up mongoose
const config = {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, config, (err) => {
    if (err) throw err;
    console.log('Mongodb connection established :)')
})

const Chat = require('./models/chatModel')
const {response} = require('express')

// socket
io.on('connection', socket => {
    socket.on('sendMessage', ({id, message, type}) => {
        try {
            const chat = new Chat({message, sender: id, type})
            chat.save((err, data) => {
                if (err) return response.status(500).json({success: false, err})

                Chat.findOne({'_id': data._id})
                    .populate('sender', '_id name username')
                    .exec((err, data) => {
                        io.emit('getMessages', data)
                    })
            })
        } catch (err) {
            return response.status(500).json({success: false, err})
        }
    })

    socket.on('disconnect', () => {

    })
})

// set up routes
app.use('/users', require('./routes/userRoute'))
app.use('/posts', require('./routes/postRoute'))
app.use('/chats', require('./routes/chatRoute'))
app.use('/uploads', express.static('uploads'));