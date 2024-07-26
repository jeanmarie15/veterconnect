const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

const Pet = require('./Pet');
const User = require('./User');
const AppoimentStatus = require('./AppoimentStatus');

class Appoiment extends Model { }

Appoiment.init({
    appoimentId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    appoimentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    diagnosis: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: 'en Horas'
    },
    observations: {
        type: DataTypes.STRING(150),
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
    },
    petId: {
        type: DataTypes.BIGINT
    },
    userId: {
        type: DataTypes.BIGINT
    },
    appoinmentStatusId: {
        type: DataTypes.BIGINT
    }
}, {
    sequelize,
    modelName: 'Appoiment',
    tableName: 'Appoiments'
});

Appoiment.belongsTo(Pet, {
    foreignKey: 'petId',
    as: 'pet'
});

Appoiment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

Appoiment.belongsTo(AppoimentStatus, {
    foreignKey: 'appoinmentStatusId',
    as: 'appoinmentStatus'
});

module.exports = Appoiment;