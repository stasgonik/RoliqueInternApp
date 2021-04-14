const Joi = require('joi');

const { regexp: { PASSWORD } } = require('../../constants');

module.exports = Joi.object({
    forgot_token: Joi.string()
        .trim()
        .required(),
    password: Joi.string()
        .trim()
        .regex(PASSWORD)
        .required(),
});
