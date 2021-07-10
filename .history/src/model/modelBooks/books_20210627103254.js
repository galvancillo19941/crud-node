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
        conn.query(`select * from books limit ${limit} OFFSET ${offset}`, callback)
    }
}



// function getAllProducts(req, res){
//     // limit as 20
//     const limit = 20
//     // page number
//     const page = req.query.page
//     // calculate offset
//     const offset = (page - 1) * limit
//     // query for fetching data with page number and offset
//     const prodsQuery = "select * from Products limit "+limit+" OFFSET "+offset
//     pool.getConnection(function(err, connection) {
//       connection.query(prodsQuery, function (error, results, fields) {
//         // When done with the connection, release it.
//         connection.release();
//              if (error) throw error;
//         // create payload
//         var jsonResult = {
//           'products_page_count':results.length,
//           'page_number':page,
//           'products':results
//         }
//         // create response
//         var myJsonString = JSON.parse(JSON.stringify(jsonResult));
//         res.statusMessage = "Products for page "+page;
//         res.statusCode = 200;
//         res.json(myJsonString);
//         res.end();
//       })
//     })
//   }