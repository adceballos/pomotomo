// we could add our functionality in the body of these callback functions, but its better practice to create a controller and have our functions there (/controllers/goalController.js)
const express = require('express')  // common js module syntax, different from ES2015 syntax where you say "import" and so on
const router = express.Router()
const { startTimer, stopTimer, deleteTimer, getTimer, resetTimer, switchPhase, fullResetTimer } = require('../controllers/timerController')

const {protect} = require('../middleware/authMiddleware')

// use protect to verify the JWT and set req.user to the authenticated user
router.get('/', protect, getTimer)
router.post('/', protect, startTimer)
router.put('/', protect, stopTimer)
router.put('/reset', protect, resetTimer)
router.put('/switch', protect, switchPhase)
router.put('/fullReset', protect, fullResetTimer)
router.delete('/', protect, deleteTimer)

module.exports = router