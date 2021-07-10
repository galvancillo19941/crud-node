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

    profileAuth: async function(req, data, callback) {
        // if(
        //     !req.headers.authorization ||
        //     !req.headers.authorization.startsWith('Bearer') ||
        //     !req.headers.authorization.split(' ')[1]
        // ){
        //     return res.status(401).json({
        //         message: "Please provide the token",
        //     });
        // }

        const theToken = headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(theToken, 'the-super-strong-secrect');

        console.log('decoded', decoded.id)


        // conn.query(
        //     `SELECT id, name, email FROM users WHERE id = ${decoded}`,
        //     callback
        // )
    }
    

}