const conn = require('../../dbConnections')

module.exports = {
    getBooks: function(callback) {
        conn.query("SELECT * FROM books", callback)
    },

    postBooks: function(req, id, callback) {
        conn.query(`INSERT INTO books
        (titulo, autor, ediccion)
        VALUES(${req.titulo}, ${req.autor}, ${req.ediccion})`, callback)
    }
}