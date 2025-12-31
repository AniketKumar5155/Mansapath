'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Issue extends Model {
        static associate(models) {
            Issue.belongsTo(models.IssueCategory, {
                foreignKey: 'issue_category_id',
            });

            Issue.belongsToMany(models.FormSubmission, {
                through: models.SubmissionIssue,
                foreignKey: 'issue_id',
                otherKey: 'submission_id',
            });
        }
    }

    Issue.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },

            issue_category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            title: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
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
            modelName: 'Issue',
            tableName: 'Issues',
            timestamps: false,
        }
    );

    return Issue;
};
