const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
})

const Image = mongoose.model('Image', ImageSchema)
module.exports = Image