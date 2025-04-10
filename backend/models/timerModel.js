// where we define our schema(fields for timer)

const mongoose = require('mongoose')

const timerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    startTime: {
        type: Date,  // Timestamp when the timer starts or is unpaused
        default: null
    },
    stopTime: {
        type: Date,  // Timestamp when the timer ends or is paused
        default: null
    },
    isRunning: {
        type: Boolean,  // If the timer is currently running (true) or paused (false)
        default: false
    },
    // elapsed time between one start/stop or pause
    elapsedTime: {
        type: Number,   // Total time in milliseconds that the user spent on the current session (for tracking progress)
        default: 0
    },
    // elapsed time total since first ever starting a timer
    elapsedTimeTotal: {
        type: Number,   // Total time in milliseconds that the user spent on the current session (for tracking progress)
        default: 0
    },
    initialTime: {
        type: Number,
        default: 10000
    },
    currentTime: {
        // update later to calculate based on phase
        type: Number,
        default: 0
    },
    isPomodoro: {
        type: Boolean,
        default: true
    },
    pomodoroCount: {
        type: Number,
        default: 0,
    },
    phaseSwitched: {
        type: Boolean,
        default: false,
    }
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Timer', timerSchema)