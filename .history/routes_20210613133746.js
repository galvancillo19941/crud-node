const express = require('express')
const routes = express.Router()
const conn = require('./dbConnections')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const {validationResult} = require('express-validator');

// listar los libros
routes.get('/books', (req, res) => {
    // la consulta que viene desde la base de datos
    // err cuando existe error
    // rows las filas que vienen de la tabla que estamos consultando
    conn.query('SELECT * FROM books', (err, rows) => {
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
})


// crear un libro
routes.post('/books', (req, res) => {
    // INSERT INTO inserta datos en la tabla, set(para setear los datos) ----> ?(representa el dato que pasamos en el array([req.body])
    // err cuando existe error
    // rows las filas que vienen de la tabla que estamos consultando
    conn.query('INSERT INTO books set ?', [req.body], (err, rows) => {
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
})


// eliminar un libro
routes.delete('/books/:id', (req, res) => {
    // DELETE FROM elimina datos en la tabla, WHERE id = ?(el cual consulta el id que vamos a eliminar) ----> ?(representa el dato que pasamos en el array([req.body])
    // err cuando existe error
    // rows las filas que vienen de la tabla que estamos consultando
    conn.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, rows) => {
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
})


// actualizar un libro
routes.put('/books/:id', (req, res) => {
    // UPDATE books set actualiza el dato en la tabla, WHERE id = ?(el cual consulta el id que vamos a eliminar) ----> ?(representa el dato que pasamos en el array([req.body])
    // err cuando existe error
    // rows las filas que vienen de la tabla que estamos consultando
    // [req.body(el dato que actualiza, req.params.id(el id del dato))]
    conn.query('UPDATE books set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
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
})



// USERS

// REGISTER
routes.post('/register', async (req,res) => {
    const salt = await bcrypt.genSalt(10);
    var users={
        "name":req.body.name,
        "email":req.body.email,
        "password": await bcrypt.hash(req.body.password, salt)
    }

    conn.query('INSERT INTO users SET ?',users, function (error, results, fields) {
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
      });
})

routes.use(bodyParser.urlencoded({extended: false}))
routes.use(bodyParser.json({limit:'10mb'}))


// LOGIN
routes.post('/login',(req, res) => {
  const email = req.body.email
  const password = req.body.password

  conn.query('SELECT * FROM users WHERE users.email = ?', [email], async ( error, results) => {

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
})


routes.get('/profile', (req, res) => {
    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
    ){
        return res.status(422).json({
            message: "Please provide the token",
        });
    }
    const theToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(theToken, 'the-super-strong-secrect');

    conn.query('SELECT `id`,`name`,`email` FROM `users` WHERE `id`=?', [decoded.id], (row) => {
        console.log(row)
        // if(row.length > 0){
        //     return res.json({
        //         user:row[0]
        //     });
        // }
        // res.json({
        //     message:"No user found"
        // });
    })
  })
module.exports = routes