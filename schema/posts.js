const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    coverimage: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Others'
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('post', postSchema)