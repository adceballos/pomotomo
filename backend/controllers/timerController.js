//  controller functions

const asyncHandler = require('express-async-handler')   // use package called express-async-handler (download in terminal using "npm i express-async-handler") so we can just use our error handler instead of try/catch in our async/await functions

const Goal = require('../models/goalModel')
const User = require('../models/userModel')
const Timer = require('../models/timerModel')
const { default: Timer } = require('../../frontend/src/components/Timer')

// @desc    Start timer
// @route   POST //api/timer/start
// @access  Private
const startTimer = asyncHandler(async (req, res) => {
    // check if a timer is already running
    const existingTimer = await Timer.findOne({ user: req.user.id, isRunning: true})

    if (existingTimer) {
        res.status(400)
        throw new Error('Timer is already running')
    }

    const timer = await Timer.create({
        user: req.user.id,
        startTime: Date.now(),
        status: 'running',
    })

    res.status(201).json(timer) // new resource succesfully created
})

// @desc    Stop timer
// @route   PUT /api/timer/stop/:id
// @access  Private
const stopTimer = asyncHandler(async (req, res) => {
    const timer = await Timer.findById(req.params.id)

    if (!timer) {
        res.status(404)
        throw new Error('Timer not found')
    }

    if (timer.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    if (timer.status !== 'running') {
        res.status(400)
        throw new Error('Timer is not currently running')
    }

    timer.endTime = Date.now()
    timer.isRunning = false
    timer.totalTime = timer.endTime - timer.startTime
    timer.status = 'stopped'

    await timer.save()

    res.status(200).json(timer)
})

// @desc    Reset timer
// @route   PUT /api/timer/reset/:id
// @access  Private
const resetTimer = asyncHandler(async (req, res) => {
    const timer = await Timer.findById(req.params.id)

    if (!timer) {
        res.status(404)
        throw new Error('Timer not found')
    }

    if (timer.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    timer.endTime = Date.now()
    timer.isRunning = false
    timer.totalTime = timer.endTime - timer.startTime
    timer.status = 'stopped'
    timer.autoPlayEnabled = false

    await timer.save()

    res.status(200).json(timer)
})

// @desc    Complete timer session
// @route   PUT /api/timer/complete/:id
// @access  Private
const completeTimer = asyncHandler(async (req, res) => {
    const timer = await Timer.findById(req.params.id)

    if (!timer) {
        res.status(404)
        throw new Error('Timer not found')
    }

    if (timer.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    if (!timer.isRunning) {
        res.status(400)
        throw new Error('Timer is not running')
    }

    timer.endTime = Date.now()
    timer.totalTime = timer.endTime - timer.startTime
    timer.isRunning = false
    timer.status = 'completed'
    timer.pomodoroCount++

    if (timer.pomodoroCount % 4 === 0) {
        // Turn off autoplay after 4 sessions
        timer.autoPlayEnabled = false
    }

    await timer.save()

    res.status(200).json(timer)
})

// @desc    Get active timer for user
// @route   GET /api/timer/active
// @access  Private
const getActiveTimer = asyncHandler(async (req, res) => {
    const timer = await Timer.findOne({ user: req.user.id, isRunning: true })

    if (!timer) {
        res.status(404)
        throw new Error('No active timer found')
    }

    res.status(200).json(timer)
})

// @desc    Toggle autoplay
// @route   PUT /api/timer/autoplay/:id
// @access  Private
const toggleAutoplay = asyncHandler(async (req, res) => {
    const timer = await Timer.findById(req.params.id)

    if (!timer) {
        res.status(404)
        throw new Error('Timer not found')
    }

    if (timer.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    timer.autoPlayEnabled = !timer.autoPlayEnabled

    await timer.save()

    res.status(200).json(timer)
})

// export functions to be used in timerRoutes.js
module.exports = {
    startTimer,
    stopTimer,
    resetTimer,
    completeTimer,
    getActiveTimer,
    toggleAutoplay,
}