'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('FormSubmissions', 'choose_your_course', {
      type: Sequelize.ENUM('CHAITANYA', 'BRAIN GYM', 'BODH'),
      allowNull: true,
      defaultValue: null,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('FormSubmissions', 'choose_your_course');
  },
};
