const asyncHandler = require('express-async-handler')

const Timer = require('../models/timerModel')

// @desc    Get timer
// @route   GET //api/timer
// @access  Private
const getTimer = asyncHandler(async (req, res) => {
    const timer = await Timer.findOne({ user: req.user.id })    // used findOne instead of just find to fix frontend displaying values incorrectly on component mount/unmount

    if (!timer) {
        res.status(404)
        throw new Error('No timer found')
    }

    res.status(200).json(timer)
})

// @desc    Start timer
// @route   POST //api/timer
// @access  Private
const startTimer = asyncHandler(async (req, res) => {
    let timer = await Timer.findOne({ user: req.user.id })    // find the timer by user id

    // create a new timer if none exists
    if (!timer) {
        timer = await Timer.create({
            user: req.user.id,
            startTime: new Date(),
            isRunning: true,
            initialTime: 10000,
            currentTime: 10000,
            isPomodoro: true,
            pomodoroCount: 0,
            phaseSwitched: false,
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
// @route   PUT //api/timer
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
    timer.currentTime -= timer.elapsedTime

    await timer.save()

    res.status(200).json(timer)
})

// @desc    Reset timer
// @route   PUT //api/timer/reset
// @access  Private
const resetTimer = asyncHandler(async (req, res) => {
    const timer = await Timer.findOne({ user: req.user.id })
    
    if (!timer) {
        res.status(404) // requested resource does not exist (timer hasn't been started yet so there's nothing to stop)
        throw new Error('Please start a timer')
    }

    timer.isRunning = false
    timer.stopTime = new Date()

    // used to fix issue where resetting timer after stopping timer would do stopTime - startTime, but start time is null from stopTimer, so it'd give an outrageous val
    if (timer.startTime) {
        timer.elapsedTime = timer.stopTime - timer.startTime
        timer.elapsedTimeTotal += timer.elapsedTime
      } else {
        timer.elapsedTime = 0
      }
    
    timer.startTime = null // reset start time, not sure if this is necessary, will test

    if (timer.phaseSwitched) {
        if (timer.isPomodoro) {
            timer.pomodoroCount++
        }

        if (timer.pomodoroCount === 4) {
            timer.initialTime = 15000
            timer.pomodoroCount = 0
        }
        else {
            timer.isPomodoro = !timer.isPomodoro
            timer.isPomodoro ? timer.initialTime = 10000 : timer.initialTime = 5000     // set initialTime to 10 secs if pomo phase, otherwise 5 secs on break phase
        }
        timer.phaseSwitched = false
    }

    timer.currentTime = timer.initialTime

    await timer.save()

    res.status(200).json(timer)
})


// @desc    Full reset timer back to first phase instead of just current phase
// @route   PUT //api/timer/fullReset
// @access  Private
const fullResetTimer = asyncHandler(async (req, res) => {
    const timer = await Timer.findOne({ user: req.user.id })
    
    if (!timer) {
        res.status(404) // requested resource does not exist (timer hasn't been started yet so there's nothing to stop)
        throw new Error('Please start a timer')
    }

    timer.isRunning = false
    timer.stopTime = new Date()

    // used to fix issue where resetting timer after stopping timer would do stopTime - startTime, but start time is null from stopTimer, so it'd give an outrageous val
    if (timer.startTime) {
        timer.elapsedTime = timer.stopTime - timer.startTime
        timer.elapsedTimeTotal += timer.elapsedTime
      } else {
        timer.elapsedTime = 0
      }
    
    timer.startTime = null // reset start time, not sure if this is necessary, will test
    timer.isPomodoro ? timer.initialTime = 10000 : timer.initialTime = 5000     // set initialTime to 10 secs if pomo phase, otherwise 5 secs on break phase
    timer.currentTime = timer.initialTime

    await timer.save()

    res.status(200).json(timer)
})

// @desc    Switch between pomodoro and rest phase
// @route   PUT //api/timer/switch
// @access  Private
const switchPhase = asyncHandler(async (req, res) => {
    const timer = await Timer.findOne({ user: req.user.id })
    
    if (!timer) {
        res.status(404) // requested resource does not exist (timer hasn't been started yet so there's nothing to stop)
        throw new Error('Please start a timer')
    }

    timer.phaseSwitched = true

    await timer.save()

    res.status(200).json(timer)
})

// dev testing purposes only
// @desc    Delete timer
// @route   DELETE //api/timer/
// @access  Private
const deleteTimer = asyncHandler(async (req, res) => {
    const timer = await Timer.findOne({ user: req.user.id })  // Find the user's timer

    if (!timer) {
        res.status(404)
        throw new Error('No timer found to delete')
    }

    // Delete the timer instance
    await Timer.deleteOne({ _id: timer._id })  // Delete the timer by its unique ID

    res.status(200).json({ message: 'Timer deleted successfully' })
})

module.exports = {
    startTimer,
    stopTimer,
    deleteTimer,
    getTimer,
    resetTimer,
    fullResetTimer,
    switchPhase,
}