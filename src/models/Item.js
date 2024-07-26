const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

class Item extends Model { }

Item.init({
    itemId: {
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
    modelName: 'Item',
    tableName: 'Items',
    timestamps: false // Ajusta según si quieres manejar los timestamps manualmente o no
});

module.exports = Item;