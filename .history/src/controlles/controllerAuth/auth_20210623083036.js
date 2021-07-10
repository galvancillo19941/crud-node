const ModelAuth = require('../../model/modelAuth/auth')

module.exports = {
    AuthRegister: function(req, res) {
        ModelAuth.registerAuth(function(error, results, fields) {
            if (error) {
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
    } 
}