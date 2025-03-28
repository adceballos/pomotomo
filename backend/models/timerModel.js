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
    endTime: {
        type: Date,  // Timestamp when the timer ends or is paused
        default: null
    },
    isRunning: {
        type: Boolean,  // If the timer is currently running (true) or paused (false)
        default: false
    },
    totalTime: {
        type: Number,   // Total time in milliseconds that the user spent on the current session (for tracking progress)
        default: 0
    },
    pomodoroCount: {
        type: Number,  // Incremented when the user completes a full Pomodoro session (work phase reaches 0)
        default: 0
    },
    phase: {
        type: String,  // Tracks whether the user is in a 'work', 'rest', or 'long break' phase
        default: 'work'
    },
    workDuration: {
        type: Number,  // User-defined work duration in milliseconds (e.g., 25 minutes = 25 * 60 * 1000)
        default: 25 * 60 * 1000,  // Default 25 minutes (can be customizable from 15 to 60 minutes)
    },
    breakDuration: {
        type: Number,  // Rest phase duration (e.g., 5 minutes = 5 * 60 * 1000)
        default: 5 * 60 * 1000,  // Default 5 minutes
    },
    longBreakDuration: {
        type: Number,  // Longer break duration (e.g., 30 minutes = 30 * 60 * 1000)
        default: 30 * 60 * 1000,  // Default 30 minutes for long break
    },
    phaseDuration: {
        type: Number,  // Current phase duration, either work or rest
        default: 25 * 60 * 1000,  // Default to work phase
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Timer', timerSchema)