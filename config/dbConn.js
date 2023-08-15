// This file creates a connection between mongoose and our mongodb database

const mongoose = require('mongoose')

const connectDB = async () => { // mongoose uses async functions
    try {
          await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
          } 
            )
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB
