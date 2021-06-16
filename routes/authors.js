const express = require('express');
const router = express.Router()
const Author = require('../models/Author')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    try {
        const author = new Author(req.body)
        await author.save();
        return res.status(200).send(author)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/', auth, async (req, res) => {
    const authorId = req.query.authorId;
    const author = await Author.findById(authorId)
    if (!author) {
        return res.status(404).send({error: 'No author with such id!'})
    }
    res.status(200).send(author)
});

module.exports = router;
