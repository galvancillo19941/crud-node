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
    },


    bookUpdate: function(req, res) {
        ModelBooks.editBooks(req.body, req.params.id, function(err, rows) {
            if(err) {
                oRes.write(JSON.stringify({
                    error: true,
                    error_object: oError         
                  }));
                  oRes.end();
            } else {
                res.send('books update..')
            }
        })
    },


    bookDelete: function(req, res) {
        ModelBooks.deleteBooks(req.params.id, function(err, rows) {
            if(err) {
                oRes.write(JSON.stringify({
                    error: true,
                    error_object: oError         
                  }));
                  oRes.end();
            } else {
                res.send('books delete..')
            }
        })
    },


    booksAll: function(req, res) {
        const limit = req.query.limit
        const page = req.query.page;
        
        ModelBooks.allBooks(limit, page, function(err, rows, results) {
            if (err) throw err;

            console.log(rows[0].numRows, rows)

            // var jsonResult = {
            //     'books_page_count':rows.length,
            //     'num_items': rows[0].numRows, 
            //     'page_number':page,
            //     'books':rows
            //   }
            //   var myJsonString = JSON.parse(JSON.stringify(jsonResult));
            //   res.statusMessage = "books for page " + page;
            //   res.statusCode = 200;
            //   res.json(myJsonString);
            //   res.end();
        })

    },


    booksSearch: function(req, res) {
        ModelBooks.searchBooks(req.query.search, function(err, rows) {
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
    }

}