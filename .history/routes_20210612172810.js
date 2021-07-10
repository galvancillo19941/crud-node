const express = require('express')
const routes = express.Router()
const conn = require('./dbConnections')

const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

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
routes.post('/register', (req,res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = conn.execute(
            "SELECT `email` FROM `users` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }

        const hashPass = bcrypt.hash(req.body.password, 12);

        const [rows] = conn.execute('INSERT INTO `users`(`name`,`email`,`password`) VALUES(?,?,?)',[
            req.body.name,
            req.body.email,
            hashPass
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
        
    }catch(err){
        next(err);
    }
})

// routes.post('/login',[
//     body('email',"Invalid email address")
//     .notEmpty()
//     .escape()
//     .trim().isEmail(),
//     body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
// ],login);

// routes.get('/getuser',getUser);

module.exports = routes