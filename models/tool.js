module.exports = function(sequelize, DataTypes) {
  var Tool = sequelize.define("Tool", {
    // eslint-disable-next-line camelcase
    name: DataTypes.STRING,
    // eslint-disable-next-line prettier/prettier
    description: DataTypes.STRING,
    // eslint-disable-next-line camelcase
    category: DataTypes.STRING,
    // eslint-disable-next-line prettier/prettier
    price: DataTypes.DECIMAL(10, 2) 
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
