module.exports = function (sequelize, DataTypes) {
    var Tool = sequelize.define("Tool", {
        tool_name: DataTypes.STRING,
        too_price: DataTypes.INTEGER
    });

    Tool.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Tool.hasMany(models.Member, {
            onDelete: "cascade"
        });
    };

    return Tool;
};

