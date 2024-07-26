const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig'); 

const Owners = require('./Owners');
const User = require('./User');

class Receivable extends Model { }

Receivable.init({
    receivableId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    saintId: {
        type: DataTypes.STRING(40),
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
    },
    ownerId: {
        type: DataTypes.BIGINT
    },
    userId: {
        type: DataTypes.BIGINT
    }
}, {
    sequelize,
    modelName: 'Receivable',
    tableName: 'Receivables'
});

Receivable.belongsTo(Owners, {
    foreignKey: 'ownerId',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    as: 'owner'
});

Receivable.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    as: 'user'
});

module.exports = Receivable