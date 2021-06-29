var DataTypes = require("sequelize").DataTypes;
var _tokens = require("./tokens");

function initModels(sequelize) {
  var tokens = _tokens(sequelize, DataTypes);

  tokens.belongsTo(user, { as: "email_user", foreignKey: "email"});
  user.hasMany(tokens, { as: "tokens", foreignKey: "email"});

  return {
    tokens,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
