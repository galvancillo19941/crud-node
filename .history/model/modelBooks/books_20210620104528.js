const conn = require('../../dbConnections')

module.exports = {
    getBooks: function(callback, res) {
        conn.query("SELECT * FROM books", callback, res)
      },
}