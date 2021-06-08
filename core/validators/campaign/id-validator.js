const Joi = require('joi');

module.exports = Joi.string()
    .required()
    .max(24)
    .min(24);
