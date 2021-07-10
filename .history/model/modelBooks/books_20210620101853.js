const conn = require('../../dbConnections')

module.exports = {
    getBooks: function(conn, callback) {
        conn.query("SELECT * FROM books", callback)
      },
}