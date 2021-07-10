const mysql = require('mysql')

const db_connection  = mysql    
.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'library'
  })

module.exports = db_connection 