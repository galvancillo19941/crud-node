const ModelBooks = require('../../model/modelBooks/books')

module.exports = {
    
    booksList: function(req, res) {
        ModelBooks.getBooks(function(err, rows) {
            if(err) {
                oRes.write(JSON.stringify({
                    error: true,
                    error_object: oError         
                  }));
                  oRes.end();
            } else {
                res.status(200).json({
                    statusCode: 200,
                    data: rows
                });
            }
        })
    },

    bookCreate: function(req, res) {
        ModelBooks.postBooks(req.body, function(err, rows) {
            if(err) {
                oRes.write(JSON.stringify({
                    error: true,
                    error_object: oError         
                  }));
                  oRes.end();
            } else {
                res.send('books success')
            }
        })
    }
}