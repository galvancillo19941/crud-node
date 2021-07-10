const conn = require('../../../dbConnections')

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
    },

    deleteBooks: function(id, callback) {
        conn.query(`DELETE FROM books WHERE id = ${id}`, callback)
    },

    allBooks: function(limit, page, callback) {
        const offset = (page - 1) * limit
        conn.query(`SELECT * FROM books limit ${limit} OFFSET ${offset}`, callback)
    }, 

    searchBooks: function(data, callback) {

        var numItems = conn.query(`SELECT count(*) as numRows FROM books`); 

        console.log(numItems)

        conn.query(`SELECT * FROM books WHERE titulo like '%${data}%'`, callback, numItems)
    }
}
