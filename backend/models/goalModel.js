// where we define our schema(fields for goals)

const mongoose = require('mongoose')    // ODM to interact with mongoDB, used to create schemas and models

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    text: {
        type: String,
        required: [true, 'Please add a text value'],
    },
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Goal', goalSchema) // model name is Goal