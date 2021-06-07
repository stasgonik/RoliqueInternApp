const Joi = require('joi');

const {
    regexp,
    sizeLimits
} = require('../../constants');
const socialProfile = require('./influencer-profiles.validator');

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
    birthdate: Joi.date(),
    profession: Joi.string()
        .min(sizeLimits.NAME_LENGTH_MIN)
        .max(sizeLimits.FIELD_LENGTH_MAX)
        .required(),
    social_profiles: Joi.array()
        .items(socialProfile)
});
