'use strict';
module.exports = (sequelize, DataTypes) => {
    const Board = sequelize.define('Board', {
        title: DataTypes.STRING,
        color: DataTypes.STRING,
        owner: DataTypes.INTEGER
    }, {});
    Board.associate = function (models) {
        Board.belongsTo(models.User, {foreignKey: 'owner', as: 'user'})
        Board.hasMany(models.Task, {foreignKey: 'boardId', as: 'task'})
    };
    return Board;
};
