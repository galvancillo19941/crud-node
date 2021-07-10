const ModelAuth = require('../../model/modelAuth/auth')
const bcrypt = require('bcryptjs');

module.exports = {
    AuthRegister: async function(req, res) {

        const salt = await bcrypt.genSalt(10);

        const password = await bcrypt.hash(req.body.password, salt)

        ModelAuth.registerAuth([req.body.name, req.body.email, password], function(err, rows, results, fields) {
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