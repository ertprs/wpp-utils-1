let mysql = require('mysql-await');

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'wpp'
});

module.exports = connection;