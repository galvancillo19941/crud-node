const ModelAuth = require('../../model/modelAuth/auth')

module.exports = {
    AuthRegister: function(req, res) {
        ModelAuth.registerAuth(req.body, function(err, rows, results) {
            console.log(results)
            // if (err) {
            //     res.json({
            //         status:false,
            //         message:'there are some error with query'
            //     })
            //   }else{
            //       res.json({
            //         status:true,
            //         data:results,
            //         message:'user registered sucessfully'
            //     })
            //   }
        })
    } 
}