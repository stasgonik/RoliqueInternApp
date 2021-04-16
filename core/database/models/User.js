const {
    Schema,
    model
} = require('mongoose');

const {
    DATA_BASE_TABLE,
    ROLES
} = require('../../constants/magic-string.enum');

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
        default: ROLES.EMPLOYEE,
    },
    password: {
        type: String,
        required: true,
    },
    forgot_token: String,
    profile_picture: String, // relative path in the static folder
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

userScheme.virtual('full_name').get(function() {
    return `${this.first_name} ${this.last_name}`;
});

module.exports = model(DATA_BASE_TABLE.USER, userScheme);
