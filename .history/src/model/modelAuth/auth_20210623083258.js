const conn = require('../../../dbConnections')
const bcrypt = require('bcryptjs');

module.exports = {
   
    registerAuth: function (data, callback) {
        const salt = await bcrypt.genSalt(10);

        const password = await bcrypt.hash(data.password, salt)

        conn.query(`INSERT INTO books SET name = '${data.name}', email = '${data.email}', password = ${password}`,)

    }
}