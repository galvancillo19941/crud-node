const ModelBooks = require('../../model/modelBooks/books')
const conn = require('../../dbConnections')



 const booksGet = (res) =>  {
        ModelBooks.getBooks(function(err, rows) {
            if(err) {
                oRes.write(JSON.stringify({
                    error: true,
                    error_object: oError         
                  }));
                  oRes.end();
            } else {
                res.sendStatus(201)
                // res.status(200).json({
                //     statusCode: 200,
                //     data: rows
                // });
            }
        })
};


module.exports = {
    booksGet
}