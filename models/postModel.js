const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    likes: [{
        type: ObjectId,
        ref: 'users'
    }],
    comments: [{
        text: String,
        commentedBy: {type: ObjectId, ref: 'users'}
    }],
    postedBy: {
        type: ObjectId,
        ref: 'users'
    },
}, {
    timestamps: true,
})

module.exports = Post = mongoose.model('posts', postSchema);