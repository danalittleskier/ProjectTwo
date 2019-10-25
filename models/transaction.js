/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    // eslint-disable-next-line camelcase
    tool_id: DataTypes.STRING,
    // eslint-disable-next-line prettier/prettier
    renter_id: DataTypes.STRING,
    // eslint-disable-next-line camelcase
    owner_id: DataTypes.STRING,
    // eslint-disable-next-line prettier/prettier
    price: DataTypes.DECIMAL(10, 2)
  });

  Transaction.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Transaction.belongsTo(models.Member, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Transaction;
};
