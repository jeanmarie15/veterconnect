const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

const Appoiment = require('./Appoiment');
const Dewormer = require('./Dewormer');

class AppoimentsDewormer extends Model { }

AppoimentsDewormer.init({
    appoimentId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    dewormerId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.TIMESTAMP,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.TIMESTAMP,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'AppoimentsDewormer',
    tableName: 'Appoiments_Dewormer',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        {
            unique: true,
            fields: ['appoimentId', 'dewormerId']
        }
    ]
});

AppoimentsDewormer.belongsTo(Appoiment, {
    foreignKey: 'appoimentId',
    // do nothing
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    as: 'appoiment'
});

AppoimentsDewormer.belongsTo(Dewormer, {
    foreignKey: 'dewormerId',
    as: 'dewormer',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

module.exports = AppoimentsDewormer;