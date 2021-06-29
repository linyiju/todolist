const fs = require('fs')
const config_temp = JSON.parse(fs.readFileSync(`${__dirname}/../config/config.json`))

/**
 * 讀取config
 */
function config() {
    if(process.env.NODE_ENV === 'production') {
        return config_temp.production
    } else {
        return config_temp.development
    }
}


module.exports = {
    config
}