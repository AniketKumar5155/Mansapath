'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      first_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      middle_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },

      email: { 
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true, 
      },

      phone_number: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },

      blood_group: {
        type: Sequelize.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
        allowNull: false,
      },

      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      address: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },

      aadhar_number: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },

      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      role: {
        type: Sequelize.ENUM('SUPERADMIN', 'EMPLOYEE'),
        allowNull: false,
        defaultValue: 'EMPLOYEE',
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
