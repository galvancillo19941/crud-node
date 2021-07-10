const ModelBooks = require('../../model/modelBooks/books')
const conn = require('../../dbConnections')


module.exports = {
    booksGet: function(res) {
        ModelBooks.getBooks(function(err, rows) {
            console.log( res.render("biodata/index", { data: rows }))
            // if(err) {
            //     oRes.write(JSON.stringify({
            //         error: true,
            //         error_object: oError         
            //       }));
            //       oRes.end();
            // } else {
            //     res.status(200).json({
            //         statusCode: 200,
            //         data: rows
            //     });
            // }
        })
      },
}