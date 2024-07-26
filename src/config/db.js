// src/config/db.js
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'veterconnect'
});

// connection.connect(error => {
//     if (error) throw error;
//     console.log('Conexión a la base de datos establecida con éxito.');
// });

module.exports = pool;