// use this file to connect to mongoDB with mongoose

const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)    //.cyan.underline comes from colors package in server.js we installed
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB