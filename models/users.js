'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      first_name: DataTypes.STRING(50),

      middle_name: DataTypes.STRING(50),

      last_name: DataTypes.STRING(50),

      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },

      phone_number: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          is: /^[0-9]{10}$/,
        },
      },

      blood_group: {
        type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
        allowNull: false,
      },

      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 18,
          max: 60,
        },
      },

      address: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },

      aadhar_number: {
        type: DataTypes.STRING(12),
        allowNull: false,
        validate: {
          is: /^[0-9]{12}$/,
        },
      },

      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM('SUPERADMIN', 'EMPLOYEE'),
        allowNull: false,
        defaultValue: 'EMPLOYEE',
      },

      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      timestamps: false,
      underscored: true,
    }
  );

  return User;
};
