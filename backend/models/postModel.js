const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    text: { type:String, required: true },
    image: { type:String },
    likes: [{ type:ObjectId, ref: 'users' }],
    postedBy: { type:ObjectId, ref: 'users' }
})

module.exports = Post = mongoose.model('posts', postSchema)