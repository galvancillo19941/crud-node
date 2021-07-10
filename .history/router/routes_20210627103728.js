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


routes.get('/books/all', BooksController.booksAll)

// LIBROS CRUD----------------------------------------------





// USERS

// REGISTER
routes.post('/register', AuthController.AuthRegister)


// LOGIN
routes.post('/login', AuthController.AuthLogin)


// PROFILE
routes.get('/profile', AuthController.AuthProfile)


module.exports = routes
