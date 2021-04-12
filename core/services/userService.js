const mongoose = require('mongoose');

const { User } = require('../database/models');
const { publicFields: { User: publicFields } } = require('../config');

module.exports = {
    // if you want to get all the fields, pass onlyPublicInfo = false as parameter
    getAllUsers: (filterObj = {}, onlyPublicInfo = true) => {
        return onlyPublicInfo ? User.find(filterObj, publicFields) : User.find(filterObj);
    },
    // if you want to get all the fields, pass onlyPublicInfo = false as parameter
    getUserById: (id, onlyPublicInfo = true) => {
        return onlyPublicInfo ? User.findById(id, publicFields) : User.find(id);
    },

    // if you want to get all the fields, pass onlyPublicInfo = false as parameter
    getUserByEmail: (email, onlyPublicInfo = true) => {
        return onlyPublicInfo ? User.findOne({ email }, publicFields) : User.findOne({ email });
    },

    createUser: (user) => User.create(user),

    checkIfUserExistsByEmail: (email) => User.exists({ email }),

    doesUserExist: (properties) => User.exists(properties),

    deleteUser: (id) => User.findByIdAndDelete(id, (err) => {
        if (err) console.log(err);
    }),

    updateUserById: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject }),

    isIdValid: (id) => mongoose.Types.ObjectId.isValid(id),
};
