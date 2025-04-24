const express = require('express')
const router = express.Router()
const { claimQuest } = require('../controllers/questController')
const { protect } = require('../middleware/authMiddleware')

router.put('/claim/:id', protect, claimQuest)

module.exports = router
