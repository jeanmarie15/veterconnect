// src/config/sequelizeConfig.js
const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('veterconnect', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql' // Ajusta el dialecto según tu base de datos
});

module.exports = sequelize;