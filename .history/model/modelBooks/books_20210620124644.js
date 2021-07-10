const conn = require('../../dbConnections')

module.exports = {
    getBooks: function(callback) {
        conn.query("SELECT * FROM books", callback)
    },

    postBooks: function(data, callback) {
        conn.query(
            `INSERT INTO books SET titulo = '${data.titulo}', autor = '${data.autor}', ediccion = ${data.ediccion}`,
            callback
          )
    },

    EditBooks: function(data, callback) {
        conn.query(
            `UPDATE INTO books SET titulo = '${data.titulo}', autor = '${data.autor}', ediccion = ${data.ediccion}`,
            callback
          )
    }
}