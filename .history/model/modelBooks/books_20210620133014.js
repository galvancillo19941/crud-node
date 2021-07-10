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

    editBooks: function(data, id, callback) {
        conn.query(
            `UPDATE books SET titulo = '${data.titulo}', autor = '${data.autor}', ediccion = ${data.ediccion} WHERE id = ${id}`,
            callback
          )
    }
}