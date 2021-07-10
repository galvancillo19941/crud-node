const conn = require('../../dbConnections')

module.exports = {
    getBooks: function(callback) {
        conn.query("SELECT * FROM books", callback)
    },

    postBooks: function(data, id, callback) {
        conn.query(`INSERT INTO books set titulo = 'adadas', autor = 'asdasd', ediccion = '2',`, callback)
    }
}