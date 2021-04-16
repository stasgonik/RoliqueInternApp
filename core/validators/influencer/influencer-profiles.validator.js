const Joi = require('joi');

module.exports = Joi.object({
    social_network_name: Joi.string(),
    social_network_profile: Joi.string(),
    social_network_followers: Joi.number().min(1)
}).and('social_network_name', 'social_network_profile', 'social_network_followers');
