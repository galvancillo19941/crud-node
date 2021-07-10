const ModelAuth = require('../../model/modelAuth/auth')

module.exports = {
    AuthRegister: function(req, res) {
        ModelAuth.registerAuth(req.body, function(err, results, fields) {
            if (err) {
                res.json({
                    status:false,
                    message:'there are some error with query'
                })
              }else{
                  res.json({
                    status:true,
                    data:results,
                    message:'user registered sucessfully'
                })
              }
        })
    },

    AuthLogin: function(req, res) {
        ModelAuth.LoginAuth(req.body, function(error, results) {
            console.log(req.body)
        })
    }
}