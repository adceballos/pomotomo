const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    // Check for headers and check if it starts with 'Bearer'. Reason for bearer is that when token is sent in the authorization header, its formatted as "Bearer adfdfadf...whatever the token is".
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from bearer header. We use .split with ' ' to split "Bearer" and the token "adfdfadf...whatever the token is" into separate elements of an array, then use [1] to get just the token.
            token = req.headers.authorization.split(' ')[1]

            // decode and verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user from the token (token has users id as payload)
            req.user = await User.findById(decoded.id).select('-password')

            // call next piece of middleware
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }