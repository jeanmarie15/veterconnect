const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

const Onwer = require('./Owners');

class Pet extends Model { }

function getFullAvatarPath(avatar) {
    const basePath = `${process.env.BASE_URL}/uploads/`;
    return `${basePath}${avatar}`;
}


Pet.init({
    petId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    breed: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    weight: {
        type: DataTypes.STRING(40),
        allowNull: false,
        comment: 'en KG'
    },
    gender: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        comment: '0 - hembra 1 - macho 2 - no aplica'
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'fecha de nacimiento'
    },
    microchip: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        comment: '0 - no 1 - si'
    },
    avatar: {
        type: DataTypes.STRING(40),
        allowNull: false,
        get() {
            const avatar = this.getDataValue('avatar');
            // Si no hay avatar, retorna null o un valor por defecto
            return avatar ? getFullAvatarPath(avatar) : null;
        }
    },
    actived: {
        type: DataTypes.SMALLINT,
        allowNull: false,
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
    ownerId: {
        type: DataTypes.BIGINT
    }
}, {
    sequelize,
    modelName: 'Pet',
    tableName: 'Pets'
});

Pet.belongsTo(Onwer, { foreignKey: 'ownerId', as: 'owner' });



module.exports = Pet;