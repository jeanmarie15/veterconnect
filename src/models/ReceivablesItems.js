const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig'); 

const Item = require('./Item');

class ReceivablesItems extends Model { }

ReceivablesItems.init({
    receivableId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    itemId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL,
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
    modelName: 'ReceivablesItems',
    tableName: 'Receivables_Items',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        {
            unique: true,
            fields: ['receivableId', 'itemId']
        }
    ]
});

ReceivablesItems.belongsTo(Item, {
    foreignKey: 'itemId',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    as: 'item'
});


module.exports = ReceivablesItems