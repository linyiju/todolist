const express = require('express')
const auth = require('./middleware/auth')
const TaskTable = require('./App/Task')

const router = express.Router()

/**
 * Create new post
 * @param {*} params
 */
router.post('/tasks', auth, async(req, res) => {
    let params = req.body
    let result = await TaskTable.addTask(params)
    res.json(result)
})

/**
 * Get task info
 */
router.get('/tasks', auth, async(req, res) => {
    let params = req.query
    console.log(params)
    let result = await TaskTable.getTask(params)
    res.json(result)
})

/**
 * Get specific task
 * @param {*} params
 */
router.get('/tasks/:id', auth, async(req, res) => {
    let params = req.params.id
    let result = await TaskTable.getTaskById(params)
    res.json(result)
})

/**
 * Update specific task
 * @param {*} params
 */
router.patch('/tasks/:id', auth, async(req, res) => {
    let updates = Object.keys(req.body.update)
    let allowedUpdates = ['description', 'completed']
    let isValidOperations = updates.every(update => allowedUpdates.includes(update))
    if(!isValidOperations) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    let id = req.params.id
    let task = await TaskTable.getTaskById(id)
    if(null == task.payload) {
        return res.send('THIS USER DOES NOT EXIST!')
    }

    let params = req.body
    let result = await TaskTable.updateTask(params)
    res.json(result)
})

/**
 * Delete Task Info
 * @param {*} params
 */
router.delete('/tasks/:id', async(req, res) => {
    let id = req.params.id
    let result = await TaskTable.deleteTask(id)
    res.json(result)
})


module.exports = router