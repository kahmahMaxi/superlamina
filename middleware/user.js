const jwt = require('jsonwebtoken')
const Auths = require('./../model/users')

const usersAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET)

        req.users = await Auths.findOne({ _id }).select(`_id`)
        req.usernames = await Auths.findOne({ _id }).select(`username`)
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }

}

module.exports = usersAuth