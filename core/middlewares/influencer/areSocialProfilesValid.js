const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { influencerService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { id, body: { social_profiles } } = req;
        if (!(social_profiles && social_profiles.length)) {
            return next();
        }

        const newProfiles = social_profiles.map(socialProfile => ({
            'social_profiles.social_network_name': socialProfile.social_network_name,
            'social_profiles.social_network_profile': socialProfile.social_network_profile
        }));

        const influencers = await influencerService.getAllInfluencers({ $or: newProfiles, _id: { $ne: id } },
            { social_profiles: 1 });

        const influencerProfiles = influencers && influencers.map(item => item.social_profiles);

        if (influencerProfiles && influencerProfiles.length) {
            let duplicateProfiles = [];
            for (const influencerProfile of influencerProfiles) {
                duplicateProfiles = duplicateProfiles.concat(
                    influencerService.compareSocialProfiles(influencerProfile, newProfiles)
                );
            }

            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.INFLUENCER_ALREADY_EXISTS.customCode, errorMessages.INFLUENCER_ALREADY_EXISTS.message,
                duplicateProfiles);
        }

        next();
    } catch (e) {
        next(e);
    }
};
