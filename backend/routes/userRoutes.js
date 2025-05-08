// routes to register user, login, and get users information

const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, updateProfilePicture, updateBio } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.put('/pfp', protect, updateProfilePicture)
router.put('/bio', protect, updateBio)

module.exports = router