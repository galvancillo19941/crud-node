const conn = require('../../dbConnections')

module.exports = {
    getBooks: function(callback) {
        conn.query("SELECT * FROM books", callback)
    },

    postBooks: function(data, id, callback) {
        conn.query(`INSERT INTO books
        (titulo, autor, ediccion)
        VALUES(${data.titulo}, ${data.autor}, ${data.ediccion})`, callback)
    }
}