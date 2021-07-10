const ModelAuth = require('../../model/modelAuth/auth')
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

module.exports = {
    
    AuthRegister: function(req, res) {
        ModelAuth.registerAuth(req.body, function(err, results, rows, fields) {
            console.log(rows)
            if (err) {
                res.json({
                    status:false,
                    message:'there are some error with query'
                })
              }else{
                  res.json({
                    status:true,
                    message:'user registered sucessfully'
                })
              }
        })
    },

    AuthLogin: function(req, res) {
        ModelAuth.loginAuth(req.body, async function(error, results, fields) {
            
            const password = req.body.password

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
    },

    AuthProfile: async function(req, res) {
        if(
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ){
            return res.status(401).json({
                message: "Please provide the token",
            });
        }
        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(theToken, 'the-super-strong-secrect');


        ModelAuth.profileAuth(decoded, async function(error, results) {
            if(await results.length > 0){
                return res.json({
                    user:results[0]
                });
            }
            res.json({
                message:"No user found"
            });
        })
    
    }
}