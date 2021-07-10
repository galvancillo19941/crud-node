const mysql = require('mysql')

const db_connection  = mysql    
.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'library'
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", err);
  });

module.exports = db_connection 