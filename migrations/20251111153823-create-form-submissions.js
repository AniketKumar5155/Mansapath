'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FormSubmissions', {
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
      gender: {
        type: Sequelize.ENUM('MALE', 'FEMALE', 'OTHER', 'RATHER NOT SAY'),
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER(3),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('ENROLLED', 'PENDING', 'REJECTED'),
        allowNull: true,
      },
      category: {
        type: Sequelize.ENUM('CHAITANYA', 'BRAIN GYM', 'BODH'),
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      problem_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      payment_method: {
        type: Sequelize.ENUM('FULL', 'INSTALLMENT'),
        allowNull: true,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_archived: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      accepted_by: {
        type: Sequelize.STRING,
        allowNull: true
      },
      accepted_at: {
        type: Sequelize.DATE,
        allowNull: true
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
    await queryInterface.dropTable('FormSubmissions');
  },
};
