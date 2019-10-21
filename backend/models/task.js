'use strict';
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        boardId: DataTypes.INTEGER
    }, {});
    Task.associate = function (models) {
        // associations can be defined here
    };
    return Task;
};
