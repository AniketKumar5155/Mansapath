'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class SubmissionIssue extends Model {
    static associate(models) {
      SubmissionIssue.belongsTo(models.FormSubmission, {
        foreignKey: 'form_submission_id',
      });

      SubmissionIssue.belongsTo(models.Issue, {
        foreignKey: 'issue_id',
      });
    }
  }

  SubmissionIssue.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      form_submission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      issue_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: 'SubmissionIssue',
      tableName: 'SubmissionIssues',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['form_submission_id', 'issue_id'],
        },
      ],
    }
  );

  return SubmissionIssue;
};
