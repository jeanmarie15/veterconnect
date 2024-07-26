const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelizeConfig');

const Appoiment = require('./Appoiment');
const Exam = require('./Exam');

class AppoimentsExams extends Model { }

AppoimentsExams.init({
    examId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    appoimentId: {
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
    modelName: 'AppoimentsExams',
    tableName: 'Exams_Appoiments',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        {
            unique: true,
            fields: ['examId', 'appoimentId']
        }
    ]
});

AppoimentsExams.belongsTo(Appoiment, {
    foreignKey: 'appoimentId',
    // do nothing
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    as: 'appoiment'
});

AppoimentsExams.belongsTo(Exam, {
    foreignKey: 'examId',
    as: 'exam',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
});

module.exports = AppoimentsExams;