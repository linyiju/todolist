const Users = require('../../models/user')
const jwt = require('jsonwebtoken')

class Utility {

    /**
     * Check Necessary Columns
     * @param {Object} params need to be checked columns
     * @param {Array<String>} requireColumns necessary keys
     */
    static checkRequired(params, requireColumns) {
        let check = {
            success: false,
            message: ''
        }
        for(let requireColumn of requireColumns) {
            if(undefined == params[requireColumn]) {
                check.message = `parameter: <${requireColumn}> is required`
                return check
            }
        }

        check['success'] = true
        return check
    }

    /**
     * Initial apiResult
     */
    static initialApiResult() {
        let apiResult = {}
        apiResult.success = false
        apiResult.message = null
        return apiResult
    }

    /**
     * Generate Auth Token
     */
    static generateAuthToken() {
        
    }
}

module.exports = Utility