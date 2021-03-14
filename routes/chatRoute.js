const router = require('express').Router()
const auth = require('../middlewares/auth')
const Chat = require('../models/chatModel')

// get all chats
router.get('/getChats', auth, async (req, res) => {
    try {
        const chats = await Chat.find().sort({'createdAt': -1}).limit(15).populate('sender', '_id name username')
        return res.status(200).json(chats)
    } catch(err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router