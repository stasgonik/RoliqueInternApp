const Joi = require('joi');

const { regexp: { EMAIL } } = require('../../constants');

module.exports = Joi.string().regex(EMAIL).trim().required();
