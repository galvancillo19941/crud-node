const conn = require('../../../dbConnections')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


module.exports = {
   
    registerAuth: async function(data, callback) {
        const salt = await bcrypt.genSalt(10);

        const password = await bcrypt.hash(data.password, salt)

        conn.query(
            `INSERT INTO users SET name = '${data.name}', email = '${data.email}', password = '${password}'`, 
            callback
        )
    },

    loginAuth: function(data, callback) {
        conn.query(
            `SELECT * FROM users WHERE users.email = '${data.email}'`, 
            callback
        )
    },
    

}