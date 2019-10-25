module.exports = function(sequelize, DataTypes) {
  var Member = sequelize.define("Member", {
    // eslint-disable-next-line camelcase
    first_name: DataTypes.STRING,
    // eslint-disable-next-line camelcase
    last_name: DataTypes.STRING,
    // eslint-disable-next-line camelcase
    zip: DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING
  });

  Member.associate = function(models) {
    Member.hasMany(models.Tool, {
      onDelete: "cascade"
    });
  };

  return Member;
};
