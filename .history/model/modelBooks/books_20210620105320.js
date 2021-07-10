
module.exports = {
    getBooks: function(con, callback) {
        con.query("SELECT * FROM books", callback)
      },
}