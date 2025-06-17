const mysql = require("mysql2");

var connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'growly'
});

module.exports = connection;
