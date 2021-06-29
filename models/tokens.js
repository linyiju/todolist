const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tokens', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
      references: {
        model: 'user',
        key: 'email'
      }
    },
    jwt: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: ""
    },
    datetime_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'tokens',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "email",
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "datetime_update",
        using: "BTREE",
        fields: [
          { name: "datetime_update" },
        ]
      },
    ]
  });
};
