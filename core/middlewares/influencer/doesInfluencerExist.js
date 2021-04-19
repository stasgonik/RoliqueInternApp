const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { influencerService } = require('../../services');

module.exports = async (req, res, next) => {
    const { social_profiles } = req.body;
    if (!social_profiles) {
        return next();
    }

    try {
        const searchArr = social_profiles.map(socialProfile => ({
            'social_profiles.social_network_name': socialProfile.social_network_name,
            'social_profiles.social_network_profile': socialProfile.social_network_profile
        }));

        const influencerExists = await influencerService.doesInfluencerExist({ $or: searchArr });
        if (influencerExists) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.INFLUENCER_ALREADY_EXISTS.customCode, errorMessages.INFLUENCER_ALREADY_EXISTS.message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
