const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { influencerService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { social_profiles } = req.body;
        if (!social_profiles.length) {
            return next();
        }

        const newProfiles = social_profiles.map(socialProfile => ({
            'social_profiles.social_network_name': socialProfile.social_network_name,
            'social_profiles.social_network_profile': socialProfile.social_network_profile
        }));

        const influencer = await influencerService.getSingleInfluencer({ $or: newProfiles },
            { social_profiles: 1 });
        const influencerProfiles = influencer && influencer.social_profiles;

        if (influencerProfiles) {
            const duplicateProfiles = [];

            for (const profile of newProfiles) {
                const newProfileName = profile['social_profiles.social_network_profile'];
                const duplicateProfile = influencerProfiles.find(item => item.social_network_profile === newProfileName);

                if (duplicateProfile) {
                    duplicateProfiles.push(duplicateProfile.social_network_name);
                }
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
