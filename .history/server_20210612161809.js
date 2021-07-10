// config -----------------------------------------------------------------

const express = require('express')
const conn = require('../dbConnection').promise();
const myconn = require('express-myconnection')

const routes = require('./routes')

const app = express()
app.set('port', process.env.PORT || 9000)

const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'library'
}

//middlewares --------------------------------------------------------------

app.use(myconn(mysql, dbOptions, 'single'))

// para que entienda el formato de datos y en este caso es formato json
app.use(express.json())


// routes -------------------------------------------------------------------
app.get('/',  (req, res) => {
    res.send('Welcome to my Api')
})

//routes del archivo routes.js
app.use('/api', routes)

// server running ------------------------------------------------------------
app.listen(app.get('port'), ()=> {
    console.log('server running on port', app.get('port'))
})