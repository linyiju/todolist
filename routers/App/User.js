const models = require('../../models/index')
const Utility = require('../Common/Utility')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


class UserTable {
    /**
     * Create new user
     * @param {*} params
     */
    static async addUser(params) {
        let apiResult = Utility.initialApiResult()
        let check = Utility.checkRequired(params, ['name', 'email', 'password'])
        if(!check['success']) {
           apiResult.message = check['message']
           return apiResult 
        }
        try {
            // Validation Part
            if(!validator.isEmail(params.email)) {
                apiResult.message = 'Email is invalid'
                return apiResult 
            }
            if(params.password.toLowerCase().includes('password')) {
                apiResult.message = 'Password cannot contain "password"'
                return apiResult 
            }

            // Password to be hashed
            params.password = await bcrypt.hash(params.password, 8)

            // Token
            let token = jwt.sign( {_id: params.email}, 'thisismynewcourse')
            let tokenInfo = {
                name: params.name,
                email: params.email,
                jwt: token
            }

            await models.User.create(params)
            await models.Tokens.create(tokenInfo)

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
     * Login User
     * @param {*} params
     */
    static async loginUser(params) {
        let apiResult = Utility.initialApiResult()
        try {
            let user = await models.User.findOne({
                where: {
                    email: params.email,
                }
            })
            
            // Token
            let token = jwt.sign( {_id: params.email}, 'thisismynewcourse')
            await models.Tokens.update(
                {jwt: token},
                {
                    where: {
                        email: params.email,
                }
            })

            if(user == null) {
                apiResult.message = 'Unable to login'
                return apiResult 
            }

            let isMatch = await bcrypt.compare(params.password, user.password)
            if(!isMatch) {
                apiResult.message = 'Unable to login'
                return apiResult 
            }

            apiResult.code = 200
            apiResult.success = true
            apiResult.message = 'SUCCESS'
            apiResult.token = token
        } catch (e) {
            apiResult.success = false
            apiResult.message = e.message 
        }
        return apiResult
    }

    /**
     * Logout User
     * @param {*} params
     */
    static async logoutUser(params) {
        let apiResult = Utility.initialApiResult()
        try {
            await models.Tokens.update(
                {jwt: ''},
                {
                    where: {
                        email: params.email,
                }
            })

            apiResult.code = 200
            apiResult.success = true
            apiResult.message = 'SUCCESS'
            // apiResult.token = params.token
        } catch (e) {
            apiResult.success = false
            apiResult.message = e.message 
        }
        return apiResult
    }

    /**
     * Get User
     */
    static async getUser() {
        let apiResult = Utility.initialApiResult()
        try {
            let user = await models.User.findAll()
            apiResult.code = 200
            apiResult.success = true
            apiResult.message = 'SUCCESS'
            apiResult.payload = user
        } catch (e) {
            apiResult.success = false
            apiResult.message = e.message
        }
        return apiResult
    }

    /**
     * Get Specific User
     * @param {*} params
     */
    static async getUserById(params) {
        let apiResult = Utility.initialApiResult()
        try {
            let user = await models.User.findOne({
                where: {
                    email: params.email,
                }
            })
            apiResult.code = 200
            apiResult.success = true
            apiResult.message = 'SUCCESS'
            apiResult.payload = user
        } catch (e) {
            apiResult.success = false
            apiResult.message = e.message
        }
        return apiResult
    }

    /**
     * Update Specific User Info
     * @param {*} params
     */
    static async updateUser(params) {
        let apiResult = Utility.initialApiResult()
        try {
            await models.User.update(
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
     * Delete User Info
     * @param {*} params
     */
    static async deleteUser(id) {
        let apiResult = Utility.initialApiResult()
        try {
            await models.User.destroy({
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

module.exports = UserTable