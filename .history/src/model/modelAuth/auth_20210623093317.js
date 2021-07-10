const conn = require('../../../dbConnections')

module.exports = {
   
    registerAuth: async function (data, callback) {
        conn.query(
            `INSERT INTO users SET name = '${data.name}', email = '${data.email}', password = ${data.password}`, 
            callback
        )

    }
}