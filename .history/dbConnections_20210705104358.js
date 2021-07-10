const mysql = require('mysql')

const db_connection  = mysql    
.createConnection({
  host: 'bgqfzegiywg8wy7cg8ej-mysql.services.clever-cloud.com',
  user: 'utoh6hvhndurmfze',
  password: 'sadneZMSKXC1QGDia9kH',
  database: 'bgqfzegiywg8wy7cg8ej'
})
.on("error", (err) => {
  console.log("Failed to connect to Database - ", err);
});
// .createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     database: 'library'
//   })
//   .on("error", (err) => {
//     console.log("Failed to connect to Database - ", err);
//   });

module.exports = db_connection 