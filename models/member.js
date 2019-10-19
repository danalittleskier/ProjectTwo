module.exports = function (sequelize, DataTypes) {
    var Member = sequelize.define("Member", {
        user_first_name: DataTypes.STRING,
        user_last_name: DataTypes.STRING,
        user_fullname: DataTypes.STRING,
        user_address: DataTypes.STRING,
        username: DataTypes.STRING
    });

    Member.associate = function (models) {
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