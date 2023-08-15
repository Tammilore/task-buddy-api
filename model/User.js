const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  userSchema = new Schema({ // No need to define ids because mongodb will do that for us
    email: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001 // We set a default for thsi cuz all users automatically have this role
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String,
    totalTasks: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)