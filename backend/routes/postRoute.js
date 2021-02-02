const router = require('express').Router()
const auth = require('../middlewares/auth')
const Post = require('../models/postModel')
const formidable = require('formidable')

router.post('/new', auth, async (req, res) => {
    try {
        const form = new formidable.IncomingForm()
        form.uploadDir = 'uploads/post-images'
        form.keepExtensions = true
        form.multiples = true

        form.parse(req, async (err, fields, files) => {
            if(err) {
                console.log(err.message)
            }
            const images = files.images
            
            let path = ''

            if(images.length > 0) {
                images.forEach((file) => {
                    path = path + file.path + ','
                })
    
                path = path.substring(0, path.lastIndexOf(','))

            } else {
                path = images.path
            }

            if(!fields.text)
            return res
                .status(400)
                .json({ msg: 'Not all fields have been entered !' })

            const newPost = new Post({
                text: fields.text,
                images: path,
                comments : [],
                postedBy: req.user
            })

            const savedPost = await (await newPost.save()).populate('postedBy', '_id name').execPopulate()

            return res.status(200).json(savedPost)

        })

    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

// get user profile posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: req.user }).populate('postedBy', '_id name').populate('comments.commentedBy', '_id name')
        return res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

// get all user posts
router.get('/all', auth, async (req, res) => {
    try {
        const posts = await Post.find().populate('postedBy', '_id name').populate('comments.commentedBy', '_id name')
        return res.status(200).json(posts)
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
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

        return res.status(200).json("Post updated successfully.")

    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
})

router.put('/like/:id', auth, async (req, res) => {
    try {
        const like = await Post.findByIdAndUpdate(req.params.id, {
            $push:{likes: req.user}
        },{ new: true }).populate('postedBy', '_id name').populate('comments.commentedBy', '_id name').exec()
        return res.status(200).json(like)

    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
})

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const like = await Post.findByIdAndUpdate(req.params.id, {
            $pull:{likes: req.user}
        },{ new: true }).populate('postedBy', '_id name').populate('comments.commentedBy', '_id name').exec()
        return res.status(200).json(like)

    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
})

router.put('/comment/:id', auth, async (req, res) => {
    try {
        const commentData = {
            text: req.body.text,
            commentedBy: req.user
        }
        const comment = await Post.findByIdAndUpdate(req.params.id, {
            $push:{comments: commentData}
        }, {new: true}).populate('postedBy', '_id name').populate('comments', '_id text').populate('comments.commentedBy', '_id name').exec()

        return res.status(200).json(comment)

    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
})

router.put('/uncomment/:id', auth, async (req, res) => {
    try {
        const comment = await Post.findByIdAndUpdate(req.params.id, {
            $pull:{comments: { _id: req.body.commentId }}
        }, {new: true}).populate('postedBy', '_id name').populate('comments', '_id text').populate('comments.commentedBy', '_id name').exec()

        return res.status(200).json(comment)

    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
})

router.post('/comment/:id', auth, async (req, res) => {
    try {
        await Post.findById(req.params.id, function(err, post) {
            if (!post)
                res.status(404).send("data is not found");
            else {
                post.comments.findByIdAndDelete
                post.comments.text = req.body.text;
                post.save().then(comment => {
                    return res.status(200).json(comment)
                })
            }
        });

    } catch(err) {
        return res.status(500).json({ error: err.message })
    }
})

module.exports = router