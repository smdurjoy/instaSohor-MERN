const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    followers: [{
        type: ObjectId,
        ref: 'users'
    }],
    following: [{
        type: ObjectId,
        ref: 'users'
    }],
})

module.exports = User = mongoose.model('users', userSchema)