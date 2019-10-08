'use strict';
module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
        title: DataTypes.STRING,
        authorId: DataTypes.INTEGER
    }, {});
    Board.associate = function (models) {
        Board.belongsTo(models.User, {foreignKey: 'authorId', as: 'user '})
    };
    return Board;
};
