const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig'); 
class Vaccine extends Model { }

Vaccine.init({
    vaccineId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Vaccine',
    tableName: 'Vaccines',
    defaultScope: {
        attributes: { exclude: ['updatedAt', 'createdAt'] }
    },
    timestamps: false // Ajusta según si quieres manejar los timestamps manualmente o no
});

module.exports = Vaccine;