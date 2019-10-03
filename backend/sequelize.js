const Sequelize = require('sequelize');
const UserModel = require('./models/user');

const sequelize = new Sequelize('trello', 'postgres', 'tosovu96', {
    dialect: 'postgres',
});

const User = UserModel(sequelize, Sequelize)

sequelize.sync()
    .then(() => {
        console.log('Databases and tables created!')
    })

module.exports = {
    User
};
