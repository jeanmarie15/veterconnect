const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig'); 

class AppoinmentStatus extends Model { }

AppoinmentStatus.init({
    appoinmentStatusId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    actived:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
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
    modelName: 'AppoinmentStatus',
    tableName: 'Appoinment_Status',
    timestamps: false // Ajusta según si quieres manejar los timestamps manualmente o no
});

module.exports = AppoinmentStatus;