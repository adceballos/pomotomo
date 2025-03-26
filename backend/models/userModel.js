
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
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema) // model name is User