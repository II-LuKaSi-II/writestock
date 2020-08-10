const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

const Subscriber = mongoose.model('Subscribers', subscriberSchema)

module.exports = Subscriber