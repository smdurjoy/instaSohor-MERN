const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    text: { type:String, required: true },
    image: { type:String },
    postedBy: { type:String, required: true }
})

module.exports = Post = mongoose.model('posts', postSchema)