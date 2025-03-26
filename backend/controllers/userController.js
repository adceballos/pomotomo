const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST //api/users
// @access  Public, can't access a protected route with logging in, and you can't login without being registered
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user exists
    const userExists = await User.findOne({email})

    // send error if user already exists, so they can't register again
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password, generate a salt in order to hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)  // pass in the users id to the generateToken function
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Authenticate a user
// @route   POST //api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    // get email and password from the body
    const {email, password} = req.body

    // check for user email
    const user = await User.findOne({email})

    // password in the db is hashed(user.password), but the password we use to login is not hashed(password), so we use bcrypt.compare to compare the plain text password thats sent in from the form and the hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)  // pass in the users id to the generateToken function
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get user data, get current logged in user after sending token and getting Id from that token
// @route   GET //api/users/me 
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT. Sign a new token with the id that's passed in, with the secret used, and it expires in 30 days.
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}