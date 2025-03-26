const express = require('express')
const cors = require('cors')
const colors = require('colors') // initialize in this file so we can use anywhere
const dotenv = require('dotenv').config()   // allows us to have a dotenv file with variables in it
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5001   // port server access port variable in .env folder, or 5000 if our .env port isn't found for some reason

connectDB()

const app = express();  // initialize express

app.use(cors())

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)   // overwrite default express error handler

app.listen(port, () => console.log(`Server started on port ${port}`))   // call listen with app object to listen on port 
