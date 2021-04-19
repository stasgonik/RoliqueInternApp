const Joi = require('joi');

const { regexp } = require('../../constants');
const {
    sizeLimits,
    magicString: { ROLES }
} = require('../../constants');

module.exports = Joi.object({
    first_name: Joi.string()
        .regex(regexp.NAME)
        .min(sizeLimits.NAME_LENGTH_MIN)
        .max(sizeLimits.FIELD_LENGTH_MAX)
        .required(),
    last_name: Joi.string()
        .regex(regexp.NAME)
        .min(sizeLimits.NAME_LENGTH_MIN)
        .max(sizeLimits.FIELD_LENGTH_MAX)
        .required(),
    password: Joi.string()
        .regex(regexp.PASSWORD)
        .min(sizeLimits.PASSWORD_LENGTH_MIN)
        .max(sizeLimits.FIELD_LENGTH_MAX),
    email: Joi.string()
        .regex(regexp.EMAIL)
        .max(sizeLimits.FIELD_LENGTH_MAX)
        .required(),
    phone: Joi.string()
        .regex(regexp.PHONE),
    role: Joi.string()
        .valid(...Object.values(ROLES))
});
