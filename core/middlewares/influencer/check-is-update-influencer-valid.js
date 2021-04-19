const {
    ErrorHandler,
    errorCodes,
    errorMessages: {
        ID_NOT_VALID,
        BODY_NOT_VALID,
        INFLUENCER_NOT_FOUND
    }
} = require('../../error');
const { influencerService } = require('../../services');
const { influencerValidator } = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;
        const idValid = await influencerService.isIdValid(id);

        if (!idValid) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, ID_NOT_VALID.customCode, ID_NOT_VALID.message);
        }
        const isInfluencerExist = await influencerService.doesInfluencerExist({ _id: id });

        if (!isInfluencerExist) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, INFLUENCER_NOT_FOUND.customCode, INFLUENCER_NOT_FOUND.message);
        }

        const { error } = influencerValidator.updateInfluencer.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, BODY_NOT_VALID.customCode, error.details[0].message);
        }

        req.id = id;
        next();
    } catch (e) {
        next(e);
    }
};
