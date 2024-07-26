const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig'); 

const AppoinmentStatus = require('./AppoinmentStatus');

class HistoryAppoinmentStatus extends Model { }

HistoryAppoinmentStatus.init({
    appoimentId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    appoinmentStatusId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'HistoryAppoinmentStatus',
    tableName: 'History_Appoinment_Status',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        {
            unique: true,
            fields: ['appoimentId', 'appoinmentStatusId']
        }
    ]
});

HistoryAppoinmentStatus.belongsTo(AppoinmentStatus, {
    foreignKey: 'appoinmentStatusId',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    as: 'status'
});

module.exports = HistoryAppoinmentStatus