const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

const Vaccine = require('./Vaccines');
const Appoiment = require('./Appoiment');

class AppoimentsVaccines extends Model { }

AppoimentsVaccines.init({
    appoimentId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    vaccineId: {
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
    modelName: 'AppoimentsVaccines',
    tableName: 'Appoiments_Vaccines',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        {
            unique: true,
            fields: ['appoimentId', 'vaccineId']
        }
    ]
});

AppoimentsVaccines.belongsTo(Appoiment, {
    foreignKey: 'appoimentId',
    // do nothing
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    as: 'appoiment'
});

AppoimentsVaccines.belongsTo(Vaccine, {
    foreignKey: 'vaccineId',
    as: 'vaccine',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

module.exports = AppoimentsVaccines;