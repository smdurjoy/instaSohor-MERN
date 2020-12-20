const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require("email-validator");
const auth = require('../middlewares/auth')

router.post('/register', async (req, res) => {
    try {
        const { name, username, email, password, passwordCheck } = req.body
        const nameRegex = /^[a-zA-Z ]+$/

        // validations
        if(!name || !username || !email || !password || !passwordCheck)
            return res
                .status(400)
                .json({ msg: 'Not all fields have been entered !' })
        
        if(!(nameRegex.test(name)))
            return res
                .status(400)
                .json({ msg: 'Please enter a valid display name' })

        if(name.length < 3)
            return res
                .status(400)
                .json({ msg: "Display name can't be less than 3 character !" })

        const existingUserWithUsername = await User.findOne({username: username})
        if(existingUserWithUsername)
            return res
                .status(400)
                .json({ msg: 'Username already taken !' })

        const existingUserWithEmail = await User.findOne({email: email})
        if(existingUserWithEmail)
            return res
                .status(400)
                .json({ msg: 'An account with this email already exists !' })

        const validEmail = validator.validate(email)
        if(!validEmail)
            return res
                .status(400)
                .json({ msg: 'Please enter a valid email address !' })

        if(password.length < 5)
        return res
            .status(400)
            .json({ msg: 'Password must be at least 5 characters long.' })

        if(password !== passwordCheck)
            return res
                .status(400)
                .json({ msg: 'Enter the same password twice.' })

        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            username,
            email,
            password: hashPassword
        })

        const savedUser = await newUser.save()
        res.json(savedUser)

    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        if(!username || !password)
            return res
                .status(400)
                .json({ msg: 'Not all fields have been entered !' })

        const user = await User.findOne({ username: username })

        if(!user) 
            return res
                .status(400)
                .json({ msg: 'No account with this username has been registered !' })

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
            return res
                .status(400)
                .json({ msg: "Sorry, that didn't work ! Try again." })
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                name: user.name
            }
        })
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

router.post('/isTokenValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token')
        if(!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) return res.json(false)

        const user = await User.findById(verified.id)
        if(!user) return res.json(false)

        return res.json(true)

    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user).select('_id name username')
    return res.json(user)
})

module.exports = router 