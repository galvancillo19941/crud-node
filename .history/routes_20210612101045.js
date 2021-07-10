const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.send('test api')
})


module.exports = routes