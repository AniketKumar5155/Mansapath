'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class IssueCategory extends Model {
    static associate(models) {
      IssueCategory.hasMany(models.Issue, {
        foreignKey: 'issue_category_id',
      });
    }
  }

  IssueCategory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'IssueCategory',
      tableName: 'IssueCategories',
      timestamps: false,
    }
  );

  return IssueCategory;
};
