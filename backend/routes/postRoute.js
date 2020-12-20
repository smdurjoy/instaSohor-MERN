const router = require('express').Router()
const auth = require('../middlewares/auth')
const Post = require('../models/postModel')

router.post('/new', auth, async (req, res) => {
    try {
        const { text, image } = req.body

        // validation
        if(!text) 
            return res
                .status(400)
                .json({ msg: 'Not all fields have been entered !' })
        
        const newPost = new Post({
            text,
            image,
            postedBy: req.user
        })

        const savedPost = await newPost.save()

        return res.json(savedPost)

    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/', auth, async (req, res) => {
    const posts = await Post.find({ postedBy: req.user })
    return res.json(posts)
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({postedBy: req.user, _id: req.params.id})

        if(!post)
            return res
                .status(400)
                .json({ msg: 'No post found with this ID that belongs to the current user.' })
        
        await Post.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg: "Post has been deleted successfully"})
        
    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        let { text, image } = req.body

        const post = await Post.findOne({postedBy: req.user, _id: req.params.id})
        console.log(post)

        if(!post)
            return res
                .status(400)
                .json({ msg: 'No post found with this ID that belongs to the current user.' })
        
        if(!text)
            text = post.text

        if(!image)
            image = post.image

        await Post.updateOne({_id: req.params.id}, {
            text,
            image
        })

        return res.status(200).json({ msg: "Post Updated Successfully" })

    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
})

module.exports = router