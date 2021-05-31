const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { campaignService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const exists = await campaignService.doesExist(req.body.title);
        if (exists) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.CAMPAIGN_ALREADY_EXISTS.customCode,
                errorMessages.CAMPAIGN_ALREADY_EXISTS.message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
