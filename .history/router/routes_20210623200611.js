const express = require('express')
const routes = express.Router()
const conn = require('../dbConnections')

const jwt = require('jsonwebtoken')


const BooksController = require('../src/controlles/controllerBooks/books')
const AuthController = require('../src/controlles/controllerAuth/auth')


// LIBROS CRUD -------------------------------

// listar los libros
routes.get('/books', BooksController.booksList)

// crear un libro
routes.post('/books', BooksController.bookCreate)

// actualizar un libro
routes.put('/books/:id', BooksController.bookUpdate)


// eliminar un libro
routes.delete('/books/:id', BooksController.bookDelete)

// LIBROS CRUD----------------------------------------------





// USERS

// REGISTER
routes.post('/register', AuthController.AuthRegister)


// LOGIN
routes.post('/login', AuthController.AuthLogin)


// PROFILE
routes.get('/profile', async (req, res) => {
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


    console.log(decoded)

    conn.query('SELECT id, name, email FROM users WHERE id = ?', [decoded.id], async (error, results) => {
        if(await results.length > 0){
            return res.json({
                user:results[0]
            });
        }
        res.json({
            message:"No user found"
        });
    })
})


module.exports = routes
