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
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Timer', timerSchema)