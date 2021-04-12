const {
    Schema,
    model
} = require('mongoose');

const { DATA_BASE_TABLE } = require('../../constants/magic-string.enum');

const userScheme = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        default: 'user',
    },
    password: {
        type: String,
        required: true,
    },
    profile_picture: String, // relative path in the static folder
});

module.exports = model(DATA_BASE_TABLE.USER, userScheme);