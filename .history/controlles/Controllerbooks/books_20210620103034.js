const ModelBooks = require('../../model/modelBooks/books')
const conn = require('../../dbConnections')


module.exports = {
    booksGet: function(req) {
        console.log('sss', conn)
        // ModelBooks.getBooks(conn, function(err, rows) {
        //     console.log('sss')
        //     // if(err) {
        //     //     oRes.write(JSON.stringify({
        //     //         error: true,
        //     //         error_object: oError         
        //     //       }));
        //     //       oRes.end();
        //     // } else {
        //     //     res.status(200).json({
        //     //         statusCode: 200,
        //     //         data: rows
        //     //     });
        //     // }
        // })
      },
}