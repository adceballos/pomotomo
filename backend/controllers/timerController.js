//  controller functions

const asyncHandler = require('express-async-handler')   // use package called express-async-handler (download in terminal using "npm i express-async-handler") so we can just use our error handler instead of try/catch in our async/await functions

const Goal = require('../models/goalModel')
const User = require('../models/userModel')
const Timer = require('../models/timerModel')

// @desc    Start timer
// @route   POST //api/timer/start
// @access  Private
const startTimer = asyncHandler(async (req, res) => {
    const timer = await Timer.find({ user: req.user.id })    // find the timer by user id

    if (!timer) {
        res.status(404)
        throw new Error('Timer not found for the user')
    }

    if (timer.isRunning) {
        res.status(400)
        throw new Error('Timer is already running')
    }

    // set the start time if not already set
    if (!timer.startTime) {
        timer.startTime = new Date() // set current time as startTime
    }

    timer.isRunning = true
    timer.phaseDuration = timer.workDuration    // default to work phase if not in a break, may have to come back to this!!!!!!!!!!!!!!!!!
    
})