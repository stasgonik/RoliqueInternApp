const Joi = require('joi');

const { regexp: { EMAIL, PASSWORD } } = require('../../constants');

module.exports = Joi.object({
    email: Joi.string()
        .regex(EMAIL)
        .required(),
    password: Joi.string()
        .regex(PASSWORD)
        .required()
});
