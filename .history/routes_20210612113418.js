const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {

    // obtiene conexion a la base de datos
    req.getConnection((err, conn) => {

        // si existe error en la consulta
        if(err) return res.send(err)
         
                    // la consulta que viene desde la base de datos
                    // err cuando existe error
                    // rows las filas que vienen de la tabla que estamos consultando
        conn.query('SELECT * FROM books', (err, rows) => {
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})


routes.post('/', (req, res) => {

    // obtiene conexion a la base de datos
    req.getConnection((err, conn) => {

        // si existe error en la consulta
        if(err) return res.send(err)
         
                    // INSERT INTO inserta datos en la tabla, set(para setear los datos) ----> ?(representa el dato que pasamos en el array([req.body])
                    // err cuando existe error
                    // rows las filas que vienen de la tabla que estamos consultando
        conn.query('INSERT INTO books set ?', [req.body], (err, rows) => {
            if(err) return res.send(err)

            res.send('books success')
        })
    })
})


routes.delete('/:id', (req, res) => {

    // obtiene conexion a la base de datos
    req.getConnection((err, conn) => {

        // si existe error en la consulta
        if(err) return res.send(err)
         
                    // DELETE FROM elimina datos en la tabla, WHERE id = ?(el cual consulta el id que vamos a eliminar) ----> ?(representa el dato que pasamos en el array([req.body])
                    // err cuando existe error
                    // rows las filas que vienen de la tabla que estamos consultando
        conn.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, rows) => {
            if(err) return res.send(err)

            res.send('books delete..')
        })
    })
})


module.exports = routes