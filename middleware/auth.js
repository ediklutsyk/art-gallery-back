const User = require('../models/User')

const auth = async (req, res, next) => {
    const id = req.header('Authorization').replace('Bearer ', '')
    try {
        const user = await User.findById(id)
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({error: 'Not authorized to access this resource'})
    }
}

module.exports = auth