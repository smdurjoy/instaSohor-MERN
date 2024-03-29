const router = require('express').Router()
const auth = require('../middlewares/auth')
const Post = require('../models/postModel')
const formidable = require('formidable')
const User = require('../models/userModel')

router.post('/new', auth, async (req, res) => {
    try {
        const form = new formidable.IncomingForm()
        form.uploadDir = 'uploads/post-images'
        form.keepExtensions = true
        form.multiples = true

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.log(err.message)
            }
            const images = files.images

            let path = images.path

            if (images.length > 0) {
                images.forEach((file) => {
                    path = path + file.path + ','
                })
                path = path.substring(0, path.lastIndexOf(','))
            }

            if (!files.images)
                path = null

            if (!fields.text)
                return res
                    .status(400)
                    .json({msg: 'Not all fields have been entered !'})

            const newPost = new Post({
                text: fields.text,
                images: path,
                comments: [],
                postedBy: req.user
            })

            const savedPost = await (await newPost.save())
                .populate('postedBy', '_id name username')
                .execPopulate();

            return res.status(200).json(savedPost)
        });

    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// get login user profile posts
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post
            .find({postedBy: req.user})
            .sort('-createdAt')
            .populate('postedBy', '_id name username')
            .populate('comments.commentedBy', '_id name username')
        return res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// get all user posts
router.get('/all', auth, async (req, res) => {
    try {
        const posts = await Post.find()
            .sort('-createdAt')
            .populate('postedBy', '_id name username')
            .populate('comments.commentedBy', '_id name username')
        return res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

// get following posts
router.get('/following-posts', auth, async (req, res) => {
    try {
        const followingArray = await User.findById(req.user).select('following')

        if (followingArray.following.length < 1)
            return res.status(201)
                .json({"msg": "You are not following anyone !"})

        const followingPosts = await Post
            .find({postedBy: {$in: followingArray.following}})
            .sort('-createdAt')
            .populate('postedBy', '_id name username')
            .populate('comments.commentedBy', '_id name username')

        // const followingUsers = await User.find({_id: {$in:followingArray.following}}).select('-password -email')

        return res.status(200).json(followingPosts)

    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

// get random user profile posts
router.get('/:username', auth, async (req, res) => {
    try {
        const user = await User
            .findOne({username: req.params.username})
            .select('_id')

        if (!user)
            return res.status(400).json({"msg": "User Not Found !"})

        const posts = await Post
            .find({postedBy: user})
            .sort('-createdAt')
            .populate('postedBy', '_id name username')
            .populate('comments.commentedBy', '_id name username')
        return res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({postedBy: req.user, _id: req.params.id})

        if (!post)
            return res
                .status(400)
                .json({msg: 'No post found with this ID that belongs to the current user.'})

        await Post.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg: "Post has been deleted successfully"})

    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        let {text, image} = req.body

        const post = await Post.findOne({postedBy: req.user, _id: req.params.id})

        if (!post)
            return res
                .status(400)
                .json({msg: 'No post found with this ID that belongs to the current user.'})

        if (!text)
            text = post.text

        if (!image)
            image = post.image

        await Post.updateOne({_id: req.params.id}, {
            text,
            image
        })

        return res.status(200).json("Post updated successfully.")

    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

router.put('/like/:id', auth, async (req, res) => {
    try {
        const like = await Post.findByIdAndUpdate(req.params.id, {
            $push: {likes: req.user}
        }, {new: true})
            .populate('postedBy', '_id name username')
            .populate('comments.commentedBy', '_id name username').exec();

        return res.status(200).json(like)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const like = await Post.findByIdAndUpdate(req.params.id, {
            $pull: {likes: req.user}
        }, {new: true})
            .populate('postedBy', '_id name username')
            .populate('comments.commentedBy', '_id name username')
            .exec();
        return res.status(200).json(like)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

router.put('/comment/:id', auth, async (req, res) => {
    try {
        const commentData = {
            text: req.body.text,
            commentedBy: req.user
        }
        const comment = await Post.findByIdAndUpdate(req.params.id, {
            $push: {comments: commentData}
        }, {new: true}).populate('postedBy', '_id name username')
            .populate('comments', '_id text')
            .populate('comments.commentedBy', '_id name username')
            .exec()
        return res.status(200).json(comment)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

router.put('/uncomment/:id', auth, async (req, res) => {
    try {
        const comment = await Post.findByIdAndUpdate(req.params.id, {
            $pull: {comments: {_id: req.body.commentId}}
        }, {new: true})
            .populate('postedBy', '_id name username')
            .populate('comments', '_id text')
            .populate('comments.commentedBy', '_id name username')
            .exec()
        return res.status(200).json(comment)
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

router.post('/comment/:id', auth, async (req, res) => {
    try {
        await Post.findById(req.params.id, function (err, post) {
            if (!post)
                res.status(404).send("data is not found");
            else {
                post.comments.findByIdAndDelete(req.params.id);
                post.comments.text = req.body.text;
                post.save().then(comment => {
                    return res.status(200).json(comment)
                })
            }
        });

    } catch (err) {
        return res.status(500).json({error: err.message})
    }
})

module.exports = router