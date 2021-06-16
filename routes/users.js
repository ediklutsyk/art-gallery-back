const express = require('express');
const router = express.Router()
const User = require('../models/User')
const Category = require('../models/Category')
const Image = require('../models/Image')
const auth = require('../middleware/auth')

router.post('/sign-up', async (req, res) => {
    console.log(req.body)
    const user = new User(req.body)
    await user.save()
    res.status(200).send({user})
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed!'})
        }
        res.status(200).send({userId: user._id})
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/add-categories', auth, async (req, res) => {
    try {
        const categoryIds = req.body.categoryIds
        const categories = await Category.find({'_id': {$in: categoryIds}});
        if (categories) {
            let user = req.user;
            categories.forEach(category => {
                user.selectedCategories.push({
                    categoryId: category._id,
                    title: category.title,
                    avatarUrl: category.avatarUrl
                })
            })
            user.save()
            req.user = user;
        }
        res.status(200).send(categories)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.get('/get-favourites', auth, async (req, res) => {
    try {
        const favIds = req.user.favouriteImages.map(fav=>{
            return fav.imageId
        })
        const images = await Image.find({'_id': {$in: favIds}});
        res.status(200).send(images)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/add-image', auth, async (req, res) => {
    try {
        const imageId = req.body.imageId
        const image = await Image.findById(imageId);
        if (image) {
            let user = req.user;
            user.favouriteImages.push({
                imageId: image._id,
                title: image.title,
                url: image.url
            })
            user.save()
            req.user = user;
        }
        res.status(200).send(image)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.post('/remove-image', auth, async (req, res) => {
    try {
        const imageId = req.body.imageId
        let user = req.user;
        user.favouriteImages = user.favouriteImages.filter(favourite => {
            return favourite.imageId === imageId
        })
        user.save()
        req.user = user;
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send({error: error.message})
    }
})

router.get('/profile', auth, async (req, res) => {
    res.status(200).send(req.user)
})

module.exports = router;
