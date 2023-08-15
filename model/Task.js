const mongoose = require('mongoose')
const Schema = mongoose.Schema

const  taskSchema = new Schema({ // No need to define ids because mongodb will do that for us
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    dueDate: {
        type: Date,
        required: true
    },
    taskOwner: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema)