'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.RefreshToken, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    },
    blood_group: {
      type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    aadhar_number: {
      type: DataTypes.STRING(12),
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: false,
  }
);


  return User;
};
