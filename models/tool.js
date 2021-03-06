module.exports = function(sequelize, DataTypes) {
  var Tool = sequelize.define("Tool", {
    // eslint-disable-next-line camelcase
    name: DataTypes.STRING,
    // eslint-disable-next-line prettier/prettier
    description: DataTypes.STRING,
    // eslint-disable-next-line camelcase
    category: DataTypes.STRING,
    // eslint-disable-next-line prettier/prettier
    price: DataTypes.DECIMAL(10, 2),
    rented: DataTypes.BOOLEAN,
    renter: DataTypes.STRING,
    image: DataTypes.STRING
  });

  Tool.associate = function(models) {
    Tool.belongsTo(models.Member, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Tool;
};
