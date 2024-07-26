const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig'); 

class Exam extends Model { }

Exam.init({
    examId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
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
    modelName: 'Exam',
    tableName: 'Exams',
    defaultScope: {
        attributes: { exclude: ['updatedAt', 'createdAt'] }
    },
    timestamps: false // Ajusta según si quieres manejar los timestamps manualmente o no
});

module.exports = Exam;