const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { purchaseItem } = require('../controllers/shopController')

router.put('/purchase/:id', protect, purchaseItem)

module.exports = router