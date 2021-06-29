const models = require('../../models/index')
const Utility = require('../Common/Utility')

class TaskTable {
    /**
     * Create new task
     * @param {*} params
     */
    static async addTask(params) {
        let apiResult = Utility.initialApiResult()
        try {
            await models.Task.create(params)
            apiResult.code = 200
            apiResult.success = true
            apiResult.message = 'SUCCESS'

        } catch (e) {
            apiResult.success = false
            apiResult.message = e.message
        }
        return apiResult
    }

    /**
     * Get Task
     */
    static async getTask(params) {
        let apiResult = Utility.initialApiResult()
        try {
            let conditions = {}            
            if(params.completed) {
                conditions['completed'] = params.completed
            }

            let page = parseInt(params.page)
            let limit = parseInt(params.limit)
            let offset = limit * (page - 1)
        
            let task = await models.Task.findAll({
                where: conditions,
                offset: offset,
                limit: limit,
                order: [['updated_at', 'DESC']]
            })

            apiResult.code = 200
            apiResult.success = true
            apiResult.message = 'SUCCESS'
            apiResult.payload = task
        } catch (e) {
            apiResult.success = false
            apiResult.message = e.message
        }
        return apiResult
    }

    /**
     * Get specific task information
     * @param {*} params
     */
    static async getTaskById(params) {
        let apiResult = Utility.initialApiResult()
        try {
            let task = await models.Task.findByPk(params)
            apiResult.code = 200
            apiResult.success = true
            apiResult.message = 'SUCCESS'
            apiResult.payload = task
        } catch (e) {
            apiResult.success = false
            apiResult.message = e.message
        }
        return apiResult
    }

    /**
     * Update Specific Task Info
     * @param {*} params
     */
    static async updateTask(params) {
        let apiResult = Utility.initialApiResult()
        try {
            await models.Task.update(
                params.update, 
                {
                    where: params.conditions
                }
            )

            apiResult.code = 200
            apiResult.success = true
            apiResult.message = 'SUCCESS'
        } catch (e) {
            apiResult.success = false
            apiResult.message = e.message   
        }
        return apiResult
    }

    /**
     * Delete Task Info
     * @param {*} params
     */
    static async deleteTask(id) {
        let apiResult = Utility.initialApiResult()
        try {
            await models.Task.destroy({
                where: {
                    id
                }
            })

            apiResult.code = 200
            apiResult.success = true
            apiResult.message = 'SUCCESS'
        } catch (e) {
            apiResult.success = false
            apiResult.message = e.message   
        }
        return apiResult
    }
}


module.exports = TaskTable