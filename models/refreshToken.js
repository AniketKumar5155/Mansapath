module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    "RefreshToken",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      user_id: {
        type: DataTypes.UUID,
        allowNull: false
      },

      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      ip: {
        type: DataTypes.STRING
      },

      user_agent: {
        type: DataTypes.TEXT
      },

      expires_at: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      tableName: "refresh_tokens",
      timestamps: true,
      underscored: true
    }
  );

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return RefreshToken;
};
