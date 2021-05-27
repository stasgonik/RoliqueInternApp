const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { campaignValidator } = require('../../validators');

module.exports = (req, res, next) => {
    try {
        const { error } = campaignValidator.createCampaignValidator.validate(req.body);
        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, error.details[0].message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
