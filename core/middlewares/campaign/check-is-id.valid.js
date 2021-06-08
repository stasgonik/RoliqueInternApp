const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { campaignService } = require('../../services');
const { campaignValidator } = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const { params: { id } } = req;

        console.log(id);
        if (!id) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.ID_NOT_EXIST.customCode,
                errorMessages.ID_NOT_EXIST.message);
        }

        const { error } = campaignValidator.idValidator.validate(id);

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.ID_NOT_VALID.customCode,
                error.details[0].message);
        }
        const campaignExist = await campaignService.getSingleCampaign({ _id: id });

        if (!campaignExist) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.ID_NOT_EXIST.customCode,
                errorMessages.ID_NOT_EXIST.message);
        }
        req.campaign = campaignExist;
        req.id = id;
        next();
    } catch (e) {
        next(e);
    }
};
