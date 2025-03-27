// where we define our schema(fields for timer)

const mongoose = require('mongoose')    // ODM to interact with mongoDB, used to create schemas and models

const timerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    startTime: {
        type: Date,
        default: null
    },
    endTime: {
        type: Date,
        default: null
    },
    isRunning: {
        type: Boolean,
        default: false
    },
    totalTime: {
        type: Number,   // ms
        default: 0

    },
    autoPlayEnabled: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,   // running, stopped, completed
        default: 'stopped'
    },
    pomodoroCount: {
        type: Number,
        default: 0
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Timer', timerSchema) // model name is Timer