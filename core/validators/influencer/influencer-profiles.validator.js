const Joi = require('joi');

const { SOCIAL_NETWORKS } = require('../../constants/magic-string.enum');

module.exports = Joi.object({
    social_network_name: Joi.string().valid(...Object.values(SOCIAL_NETWORKS)),
    social_network_profile: Joi.string(),
    social_network_followers: Joi.number().min(1)
}).and('social_network_name', 'social_network_profile', 'social_network_followers');
