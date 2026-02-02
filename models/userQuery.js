'use strict'

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserQuery extends Model {
        static associate(models) {
            // associations
        }
    }
    UserQuery.init(
        {
            id: {
                type: DataTypes.INTEGER(),
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            phone_number: {
                type: DataTypes.STRING(15),
                allowNull: false,
            },
            message: {
                type: DataTypes.TEXT(),
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM('PENDING', 'RESOLVED'),
                allowNull: true,
                defaultValue: null,
            },
            created_at: {
                type: DataTypes.DATE(),
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE(),
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'UserQuery',
            tableName: 'UserQueries',
            timestamps: false,
        }
    )

    return UserQuery;
}