const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig'); 


class Licence extends Model { }

Licence.init({
    licenceId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    actived: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
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
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Licence',
    tableName: 'Licences',
    timestamps: false // Ajusta según si quieres manejar los timestamps manualmente o no
});

module.exports = Licence;