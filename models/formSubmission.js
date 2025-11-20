'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class FormSubmission extends Model {
        static associate(models) {
            
        }
    }

    FormSubmission.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            middle_name: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            last_name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            gender: {
                type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER', 'RATHER NOT SAY', "PINEAPPLE"),
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER(3),
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED', 'OPEN'),
                allowNull: false,
                defaultValue: 'OPEN',
            },
            category: {
                type: DataTypes.ENUM('MENTAL FITNESS', 'MENTAL THERAPY'),
                allowNull: true,
                defaultValue: null,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: true,
                validate: {
                    isEmail: true,
                },
            },
            phone_number: {
                type: DataTypes.STRING(15),
                allowNull: false,
                validate: {
                    is: /^[0-9+\- ]+$/i,
                },
            },
            address: {
                type: DataTypes.STRING(300),
                allowNull: false,
            },
            problem_description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            is_archived: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'FormSubmission',
            tableName: 'FormSubmissions',
            timestamps: false,
        }
    );

    return FormSubmission;
};