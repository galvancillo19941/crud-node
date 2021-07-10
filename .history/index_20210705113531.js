// config -----------------------------------------------------------------

const express = require('express')
const routes = require('./router/routes')
const app = express()
const cors = require('cors')

app.set('port', process.env.PORT || 9000)

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
app.listen(app.get(9000), ()=> {
    console.log('server running on port', app.get(process.env.PORT || 9000))
})
