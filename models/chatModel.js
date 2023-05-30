const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    sender: {
        type: ObjectId,
        ref: 'users'
    },
    type: {
        type: String
    },
}, {timestamps: true})

module.exports = Chat = mongoose.model('chats', chatSchema)