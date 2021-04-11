const {
    Schema,
    model
} = require('mongoose');

const { DB_MODEL_NAMES } = require('../../constants');

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
    phone: String,
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

module.exports = model(DB_MODEL_NAMES.USER, userScheme);
