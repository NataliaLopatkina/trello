'use strict';
module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        boardId: DataTypes.INTEGER,
        state: DataTypes.STRING
    }, {});
    Task.associate = function (models) {
        Task.belongsTo(models.Board, { foreignKey: 'boardId', as: 'board' })
    };
    return Task;
};
