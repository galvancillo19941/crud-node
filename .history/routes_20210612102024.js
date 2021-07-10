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


module.exports = routes