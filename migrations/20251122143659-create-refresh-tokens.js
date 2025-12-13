"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("refresh_tokens", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },

      user_id: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },

      token: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      ip: {
        type: Sequelize.STRING
      },

      user_agent: {
        type: Sequelize.TEXT
      },

      expires_at: {
        type: Sequelize.DATE,
        allowNull: false
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        )
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("refresh_tokens");
  }
};
