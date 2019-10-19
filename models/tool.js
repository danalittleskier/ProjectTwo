module.exports = function(sequelize, DataTypes) {
  var Tool = sequelize.define("Tool", {
    // eslint-disable-next-line camelcase
    tool_name: DataTypes.STRING,
    // eslint-disable-next-line camelcase
    too_price: DataTypes.INTEGER
  });

  Tool.associate = function(models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Tool.hasMany(models.Member, {
      onDelete: "cascade"
    });
  };

  return Tool;
};
