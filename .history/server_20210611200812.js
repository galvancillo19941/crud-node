const express = require('express')

const app = express()
app.set('port', process.env.PORT || 9000)

// routes -------------------------------------------------------------------
app.get('/',  (req, res) => {
    res.send('Welcome to my Api')
})

// server running ------------------------------------------------------------
app.listen(app.get('port'), ()=> {
    console.log('server running on port', app.get('port'))
})