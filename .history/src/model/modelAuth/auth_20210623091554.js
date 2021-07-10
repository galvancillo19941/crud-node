const conn = require('../../../dbConnections')
const bcrypt = require('bcryptjs');

module.exports = {
   
    registerAuth: async function (data, callback) {
        const salt = await bcrypt.genSalt(10);

        const password = await bcrypt.hash(data.password, salt)

        await conn.query( `insert into user(name,email,password)
        values(?,?,?,?,?)`,
        [
            data.name,
            data.email,
            password,
        ],)

        // conn.query(
        //     `INSERT INTO users SET name = '${data.name}', email = '${data.email}', password = ${password}`, 
        //     callback
        // )

    }
}