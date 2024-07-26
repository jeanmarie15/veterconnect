const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig'); 

class Owner extends Model { }

Owner.init({
    ownerId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    saintId: {
        type: DataTypes.STRING(40),
        // allowNull por defecto es true, permitiendo que este campo sea opcional
    },
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Owner',
    tableName: 'Owners', // Asegúrate de que el nombre de la tabla coincida exactamente, incluyendo mayúsculas y minúsculas
    timestamps: false, // Desactiva los timestamps automáticos ya que los estamos definiendo manualmente
    defaultScope: {
        attributes: { exclude: [ 'updatedAt', 'createdAt'] }
    },
});

module.exports = Owner;