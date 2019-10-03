const { User}  = require('../models');

exports.getUser = async function (query) {
    return await User.findOne(query);
}

exports.createUser = async function (query) {
    return await User.create(query);
}
