const express = require('express');
const router = express.Router()
const Category = require('../models/Category')
const Image = require('../models/Image')
const Author = require('../models/Author')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    try {
        const author = await Author.findById(req.body.authorId)
        if (!author) {
            return res.status(404).send({error: 'No author with such id!'})
        }
        const category = await Category.findById(req.body.categoryId)
        if (!category) {
            return res.status(404).send({error: 'No category such id!'})
        }
        const image = new Image({...req.body, authorName: author.name})
        await image.save();
        category.images.push(image.id)
        category.save()
        return res.status(200).send(image)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/all', auth, async (req, res) => {
    const categories = await Category.find()
    res.status(200).send(categories.map(category => {
        return {
            title: category.title,
            avatarUrl: category.avatarUrl
        }
    }))
});

router.get('/images', async (req, res) => {
    try {
        const categoryId = req.query.categoryId;
        const category = await Category.findById(categoryId)
        if (!category) {
            return res.status(404).send({error: 'No category with such id!'})
        }
        res.status(200).send({images: category.images})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

module.exports = router;
