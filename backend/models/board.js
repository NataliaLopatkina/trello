'use strict';
module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
        title: DataTypes.STRING,
        color: DataTypes.STRING,
        authorId: DataTypes.INTEGER
    }, {});
    Board.associate = function (models) {
        // associations can be defined here
    };
    return Board;
};
