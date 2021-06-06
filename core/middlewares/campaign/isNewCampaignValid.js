const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { campaignValidator } = require('../../validators');
const { userService } = require('../../services');
const { magicString: { ROLES } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        if (req.body.budget) {
            req.body.budget = JSON.parse(req.body.budget);
        }

        if (req.body.hashtags) {
            req.body.hashtags = JSON.parse(req.body.hashtags);
        }

        const { error } = campaignValidator.createCampaignValidator.validate(req.body);
        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, error.details[0].message);
        }

        const { _team_lead } = req.body;

        const teamLead = await userService.getUserById(_team_lead);
        if (!teamLead || teamLead.role !== ROLES.MANAGER) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_CAMPAIGN_LEAD.customCode,
                errorMessages.BAD_CAMPAIGN_LEAD.message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
