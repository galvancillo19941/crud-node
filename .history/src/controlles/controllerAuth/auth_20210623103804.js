const ModelAuth = require('../../model/modelAuth/auth')
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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
        ModelAuth.LoginAuth(req.body, async function(error, results, fields) {

            if (results.length === 0) {
                return res.status(422).json({
                    message: "Invalid email address",
                });
            }
        
            const passMatch = await bcrypt.compare(password, results && results[0].password);
        
            if(!passMatch){
                return res.status(422).json({
                    message: "Incorrect password",
                });
            }
        
            if (results.length > 0) {
        
                  const theToken  = jwt.sign({id:results[0].id}, 'the-super-strong-secrect', {
                     expiresIn: 60 * 60 * 24 // expires in 24 hours
                  })
        
                  res.send({
                    status:true,
                    token:theToken,
                    message:'Login sucessfully'
                  })
            }
        })
    }
}