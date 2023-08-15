require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { logger } = require('./middleware/logEvents') // You nly need to use curly braces when there are more than one function in the function being imported, otherwise just write it plainly like below
const errorHandler  = require('./middleware/errorHandler')
const verifyJWT = require('./middleware/verifyJWT')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = process.env.PORT || 3500

// Connect to Mongodb
connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false})) //This middleware is for handling urlencoded/form data. Extracting it as a param from the url

app.use(express.json()) //This middleware is for handling json

app.use(cookieParser()) // This middleware is for handling cookies

app.use('/', express.static(path.join(__dirname, '/public'))) // This middleware is to serve static files that are made available publicly for all the routes coming after

app.use('/', require('./routes/root')) // This is for serving files that are directly under the views directory through import of the code in root under routes
app.use('/register', require('./routes/api/register'))
app.use('/auth', require('./routes/api/auth'))
app.use('/refresh', require('./routes/api/refresh'))
app.use('/logout', require('./routes/api/logout'))

app.use(verifyJWT)
app.use('/tasks', require('./routes/api/tasks'))
app.use('/users', require('./routes/api/users'))


app.get('/*', (req, res) => { // For every other route undefined for a GET request send to the 404 page
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
       res.sendFile(path.join(__dirname, 'views', '404.html')) 
    }
    if (req.accepts('json')) {
       res.json({ error: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }

})
// The above catch-all route to 404 should be last, after all other routes have been defined

app.use(errorHandler)

// The below is so we only listen and open our port if we are certain that our database is connected
mongoose.connection.once('open', () => {
   console.log('Connected to MongoDB')
   app.listen(PORT, () => console.log(`Server running on ${PORT}`)) // This should always be the last thing on the server.js file
})
