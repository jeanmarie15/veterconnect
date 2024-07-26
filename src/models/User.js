const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

const Company = require('./Company');

class User extends Model { }

User.init({
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    companyId: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    actived: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    deleted: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 0
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
    modelName: 'User',
    tableName: 'Users',
    defaultScope: {
        attributes: { exclude: [ 'updatedAt', 'createdAt'] }
    },
});

User.belongsTo(Company, {
    foreignKey: 'companyId',
    as: 'company'
});

module.exports = User;