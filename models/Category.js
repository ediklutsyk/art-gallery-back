const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        required: true
    },
    images:  [{type: String}],
})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category