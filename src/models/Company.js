const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig'); 
const Licence = require('./Licenses'); // Asegúrate de ajustar la ruta al archivo Licences.js
const Setting = require('./Settings'); // Asegúrate de ajustar la ruta al archivo Settings.js


class Company extends Model { }

Company.init({
    companyId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    rif: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    address: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    actived: {
        type: DataTypes.SMALLINT,
        defaultValue: 1
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
    },
    licenceId: {
        type: DataTypes.BIGINT,
        allowNull: true
    },
    settingId: {
        type: DataTypes.BIGINT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Company',
    tableName: 'Company',
    // Excluir campos por defecto
    defaultScope: {
        attributes: { exclude: ['licenceId', 'updatedAt', 'createdAt'] }
    },
    timestamps: false // Ajusta según si quieres manejar los timestamps manualmente o no
});

Company.belongsTo(Licence, { foreignKey: 'licenceId', as: 'licence' });
Company.belongsTo(Setting, { foreignKey: 'settingId', as: 'setting' });

Company.afterFind((company) => {
    // hide the licenceId and settingId from the response
    if(company?.licenceId) {
        delete company.licenceId;
    }
    if(company?.settingId) {
        delete company.settingId;
    }
    return company;
});

module.exports = Company;