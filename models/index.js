const Sequelize = require('sequelize')
const base = require('../lib/base')
const sequelize = new Sequelize(
    base.config().database,
    base.config().user,
    base.config().password,
    {
        host: base.config().host,
        dialect: base.config().dialect,
        pool: base.config().pool
    }
)
const User = require('./user')(sequelize, Sequelize)
const Task = require('./task')(sequelize, Sequelize)
const Tokens = require('./tokens')(sequelize, Sequelize)

/**
 * Create Table
 */
async function createTables() {
    try {
        // Create User Table
        await User.sync()

        // Create Task Table
        await Task.sync()

        // Create Tokens Table
        await Tokens.sync()
    } catch (e) {
        throw new Error(e)
    } finally {
        await sequelize.close()
    }
}



module.exports = {
    createTables,
    User,
    Task,
    Tokens
}

