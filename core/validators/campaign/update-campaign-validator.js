const Joi = require('joi');

const { sizeLimits, magicString: { CAMPAIGN_STATUS, CAMPAIGN_EFFORT } } = require('../../constants');
const { userService } = require('../../services');

module.exports = Joi.object({
    title: Joi.string(),
    status: Joi.string()
        .valid(...Object.values(CAMPAIGN_STATUS)),
    effort: Joi.string()
        .valid(...Object.values(CAMPAIGN_EFFORT)),
    start_date: Joi.date(),
    end_date: Joi.date(),
    hashtags: Joi.array().items(
        Joi.string()
            .min(sizeLimits.NAME_LENGTH_MIN)
            .max(sizeLimits.FIELD_LENGTH_MAX)
    ),
    _brand: Joi.string()
        .custom(value => {
            if (userService.isIdValid(value)) {
                return value;
            }

            throw new Error('the brand id is not a valid mongo id');
        }),
    budget: Joi.object({
        totalBudget: Joi.number(),
        subBudgets: Joi.object({
            influencerBudget: Joi.number(),
            socialAdsMediaBudget: Joi.number(),
            productionBudget: Joi.number(),
            handlingFee: Joi.number(),
            otherBudget: Joi.number(),
        })
    }),
    campaign_logo: Joi.string(),
    _team_lead: Joi.string()
        .custom(value => {
            if (userService.isIdValid(value)) {
                return value;
            }

            throw new Error('the team lead id is not a valid mongo id');
        }),
    client_description: Joi.string()
        .max(sizeLimits.CAMPAIGN_FIELD_MAX),
    internal_note: Joi.string()
        .max(sizeLimits.CAMPAIGN_FIELD_MAX),
});
