const conn = require('../../dbConnections')

module.exports = {
    getBooks: function(callback) {
        conn.query("SELECT * FROM books", callback)
    },

    postBooks: function(data, callback) {
        conn.query(
            `INSERT INTO books SET titulo = 'holaaa', autor = 'asdasd', ediccion = 1`,
            callback
          )
    }
}