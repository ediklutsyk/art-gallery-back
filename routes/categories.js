const express = require('express');
const router = express.Router()
const Category = require('../models/Category')
const Image = require('../models/Image')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    try {
        const category = new Category(req.body)
        await category.save();
        res.status(200).send(category)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/all', auth, async (req, res) => {
    const categories = await Category.find()
    res.status(200).send(categories.map(category => {
        return {
            _id: category._id,
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
        const result = category.images.map(imageId => {
            return imageId;
        })
        const images = await Image.find({'_id': {$in: result}});
        res.status(200).send({images: images})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

module.exports = router;
