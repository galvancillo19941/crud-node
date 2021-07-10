const conn = require('../../dbConnections')

module.exports = {
    getBooks: function(callback) {
        conn.query("SELECT * FROM books", callback)
    },

    postBooks: function(req, callback) {
        console.log(req.body)
        // conn.query('INSERT INTO books set ?', [req.body], callback)
    }
}