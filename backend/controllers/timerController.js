const asyncHandler = require('express-async-handler')

const Timer = require('../models/timerModel')

// @desc    Start timer
// @route   POST //api/timer/
// @access  Private
const startTimer = asyncHandler(async (req, res) => {
    let timer = await Timer.findOne({ user: req.user.id })    // find the timer by user id

    // create a new timer if none exists
    if (!timer) {
        timer = await Timer.create({
            user: req.user.id,
            startTime: new Date(),
            isRunning: true,
        })
        return res.status(200).json(timer) // return newly created timer
    }

    // return error if user tries to press start timer button again after already running
    if (timer.isRunning) {
        res.status(400)
        throw new Error('Timer is already running')
    }

    // if timer has been started again after being stopped
    if (!timer.isRunning) {
        timer.isRunning = true
        timer.startTime = new Date()
        timer.elapsedTime = 0
    }

    await timer.save()

    res.status(200).json(timer)
})

// @desc    Stop timer
// @route   PUT //api/timer/
// @access  Private
const stopTimer = asyncHandler(async (req, res) => {
    const timer = await Timer.findOne({ user: req.user.id })
    
    if (!timer) {
        res.status(404) // requested resource does not exist (timer hasn't been started yet so there's nothing to stop)
        throw new Error('Please start a timer')
    }

    // return error if user tries to press stop timer button again after already stopping
    if (!timer.isRunning) {
        res.status(400)
        throw new Error('Timer is already stopped')
    }

    timer.isRunning = false
    timer.stopTime = new Date()
    timer.elapsedTime = timer.stopTime - timer.startTime
    timer.elapsedTimeTotal += timer.elapsedTime
    timer.startTime = null // reset start time, not sure if this is necessary, will test

    await timer.save()

    res.status(200).json(timer)
})

// dev testing purposes only
// @desc    Delete timer
// @route   DELETE //api/timer/
// @access  Private
const deleteTimer = asyncHandler(async (req, res) => {
    const timer = await Timer.findOne({ user: req.user.id });  // Find the user's timer

    if (!timer) {
        res.status(404);
        throw new Error('No timer found to delete');
    }

    // Delete the timer instance
    await Timer.deleteOne({ _id: timer._id });  // Delete the timer by its unique ID

    res.status(200).json({ message: 'Timer deleted successfully' });
});

module.exports = {
    startTimer,
    stopTimer,
    deleteTimer,
}