module.exports = (sequelize, type) => {
    const Board = sequelize.define('Board', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },

        title: {
            type: type.STRING,
            allowNull: false,
        },

        createdAt: {
            allowNull: false,
            type: type.DATE
        },
        
        updatedAt: {
            allowNull: false,
            type: type.DATE
        }
    })

    return Board
}
