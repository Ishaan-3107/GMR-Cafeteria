const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysql.admin@123',
  database: 'gmr_cafeteria',
});

module.exports = db;
