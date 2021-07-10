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
        const limit = 2
        const page = req.query.page
        ModelBooks.allBooks(limit, page, function(err, rows, results, fields) {
            // if (err) throw err;
            var jsonResult = {
                'products_page_count':results.length,
                'page_number':page,
                'products':results
              }
              // create response
              var myJsonString = JSON.parse(JSON.stringify(jsonResult));
              res.statusMessage = "Products for page " + page;
              res.statusCode = 200;
              res.json(myJsonString);
              res.end();
        })
    }

}