const express = require('express')
const routes = express.Router()
const conn = require('./dbConnections')

const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');

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
// routes.post('/register', [
//     body('name',"The name must be of minimum 3 characters length")
//     .notEmpty()
//     .escape()
//     .trim()
//     .isLength({ min: 3 }),
//     body('email',"Invalid email address")
//     .notEmpty()
//     .escape()
//     .trim().isEmail(),
//     body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
// ], register);

// routes.post('/login',[
//     body('email',"Invalid email address")
//     .notEmpty()
//     .escape()
//     .trim().isEmail(),
//     body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
// ],login);

// routes.get('/getuser',getUser);

module.exports = routes