const { User } = require('../database/models');

const publicFields = [
    'first_name',
    'last_name',
    'email',
    'phone'
];

module.exports = {
    // use this function only within back-end. For sending users to the client, use getAllUsers()
    getAllUsers_internal: (filterObj = {}) => User.find(filterObj),

    getAllUsers: (filterObj = {}) => User.find(filterObj, publicFields)
};
