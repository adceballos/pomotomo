
const mongoose = require('mongoose')    // ODM to interact with mongoDB, used to create schemas and models    

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,    // don't want two of the same email adresses
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    questsCompleted: {
        type: [String], // array of quest IDs
        default: []
    },
    itemsPurchased: {
        type: [String], // array of item IDs
        default: []
    },      
    level: {
        type: Number,
        default: 1
    },
    xp: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    badges: [{
        type: String,
    }],
    streakCount: {
        type: Number,
        default: 0
    },
    lastActiveDate: {
        type: Date,
        default: null
    },
    dailyStudyLog: {
        type: Map,
        of: Number,
        default: {},
    },
      
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema) // model name is User