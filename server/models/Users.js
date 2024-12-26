const mongoose = require('mongoose')

const user = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('User', user)