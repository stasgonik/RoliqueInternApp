const {
    ErrorHandler,
    errorMessages,
    errorCodes
} = require('../../error');
const { campaignService } = require('../../services');
const { campaignValidator } = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const {
            body,
            params: { id }
        } = req;

        if (body.budget) {
            body.budget = JSON.parse(body.budget);
        }

        if (body.hashtags) {
            body.hashtags = JSON.parse(body.hashtags);
        }
        console.log(body);

        if (!id) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.ID_NOT_EXIST.customCode,
                errorMessages.ID_NOT_EXIST.message);
        }

        const campaign = await campaignService.getSingleCampaign({ _id: id });

        if (!campaign) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.ID_NOT_VALID.customCode,
                errorMessages.ID_NOT_VALID.message);
        }

        const { error } = campaignValidator.updateCampaignValidator.validate(body);

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, error.details[0].message);
        }

        if (!body.budget) {
            body.budget = null;
        }
        if (!body.hashtags) {
            body.hashtags = null;
        }

        req.campaign = campaign;
        req.id = id;
        next();
    } catch (e) {
        next(e);
    }
};
