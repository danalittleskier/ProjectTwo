module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("Member", {
    // eslint-disable-next-line camelcase
    user_first_name: DataTypes.STRING,
    // eslint-disable-next-line camelcase
    user_last_name: DataTypes.STRING,
    // eslint-disable-next-line camelcase
    user_fullname: DataTypes.STRING,
    // eslint-disable-next-line camelcase
    user_address: DataTypes.STRING,
    username: DataTypes.STRING
  });

  Member.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Member.belongsTo(models.Tool, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Member;
};
