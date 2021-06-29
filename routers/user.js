const express = require('express')
const auth = require('./middleware/auth')
const UserTable = require('./App/User')

const router = express.Router()

const multer  = require('multer')
const upload = multer({ 
    dest: 'images/',
    limit: {
        fileSize: 1000000
    },
    fileFilter(req, file , cb) {
        // non-immage file shoule be failed
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return (cb(new Error('Please upload image')))
        }

        cb(undefined, true)
    }
})

/**
 * Create new user
 * @param {*} params
 */
router.post('/user', async(req, res) => {
    let params = req.body
    let result = await UserTable.addUser(params)
    res.json(result)
})

/**
 * Login
 */
router.post('/user/login', async(req, res) => {
    let params = req.body
    let result = await UserTable.loginUser(params)
    res.json(result)
})

/**
 * Logout
 */
router.post('/user/logout', auth, async(req, res) => {
    let params = req.user
    let result = await UserTable.logoutUser(params)
    res.json(result)
})

/**
 * Get user information
 */
router.get('/user', auth, async(req, res) => {
    let result = await UserTable.getUser()
    res.json(result)
})

/**
 * Get specific user information
 * @param {*} params
 */
router.get('/user/me', auth, async(req, res) => {
    let params = req.user
    let result = await UserTable.getUserById(params)
    res.json(result)
})

/**
 * Update User Info
 * @param {*} params
 */
router.patch('/user/me', auth, async(req, res) => {
    let updates = Object.keys(req.body.update)
    let allowedUpdates = ['name', 'email', 'password']
    let isValidOperations = updates.every(update => allowedUpdates.includes(update))
    if(!isValidOperations) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    let id = req.params.id
    let user = await UserTable.getUserById(id)
    if(null == user.payload) {
        return res.send('THIS USER DOES NOT EXIST!')
    }

    let params = req.body
    let result = await UserTable.updateUser(params)
    res.json(result)
})

/**
 * Delete User Info
 * @param {*} params
 */
router.delete('/user/me', auth, async(req, res) => {
    let id = req.params.id
    let result = await UserTable.deleteUser(id)
    res.json(result)
})

/**
 * Upload Avatar
 */
router.post('/user/me/avatar', upload.single('avatar'), async(req, res) => {
        res.send()
    }, (error, req, res, next) => {
        res.status(400).send({error: error.message})
})

module.exports = router