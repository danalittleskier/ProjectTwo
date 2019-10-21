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

  return Transaction;
};
