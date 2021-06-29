const jwt = require('jsonwebtoken')
const models = require('../../models/index')

const auth = async(req, res, next) => {
    try {
        let token = req.header('Authorization').replace('Bearer ', '')

        let decoded = jwt.verify(token, 'thisismynewcourse')
        let user = await models.Tokens.findOne({
            where: {
                email: decoded._id
            }
        })

        if(!user.jwt) {
            throw new Error()
        }

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error: 'Please authenticate.'})
    }
}

module.exports = auth