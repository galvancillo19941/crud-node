// config -----------------------------------------------------------------

const express = require('express')
const routes = require('./routes')
const app = express()
const cors = require('cors')
const con = require('./dbConnections')


app.set('port', process.env.PORT || 9000)


app.use(function(req, res, next) {
  req.con = con
  next()
})


// cors
app.use(cors())

// para que entienda el formato de datos y en este caso es formato json
app.use(express.json())


// routes -------------------------------------------------------------------
//routes del archivo routes.js
app.use('/api', routes)

// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});

// server running ------------------------------------------------------------
app.listen(app.get('port'), ()=> {
    console.log('server running on port', app.get('port'))
})