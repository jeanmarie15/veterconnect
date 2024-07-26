const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig'); 

class Setting extends Model { }

Setting.init({
    settingId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    daysOpen: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: 'S-S-S-S-S-N-N'
    },
    dateOpen: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: '08:00'
    },
    dateClose: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: '17:00'
    },
    appoinmentDuration: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 30
    },
    emailNotificationEnabled: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    whatsappNotificationEnabled: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    smsNotificationEnabled: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: 'TIMESTAMP',
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Setting',
    tableName: 'Settings',
    timestamps: false, // Ajusta según si quieres manejar los timestamps manualmente o no
    defaultScope: {
        attributes: { exclude: [ 'updatedAt', 'createdAt'] }
    },
});

module.exports = Setting;