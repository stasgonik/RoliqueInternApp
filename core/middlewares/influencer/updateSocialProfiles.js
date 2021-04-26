const { magicString: { SOCIAL_NETWORKS } } = require('../../constants');
const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { influencerService } = require('../../services');

// eslint-disable-next-line complexity
module.exports = async (req, res, next) => {
    const {
        body,
        params: { id }
    } = req;
    const allNetworks = Object.values(SOCIAL_NETWORKS);

    try {
        const influencer = await influencerService.getInfluencerById(id);
        if (!influencer) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.INFLUENCER_NOT_FOUND.customCode,
                errorMessages.INFLUENCER_NOT_FOUND.message);
        }

        const socialProfiles = influencer.social_profiles.map(value => {
            const profile = value._doc;
            delete profile._id;
            return profile;
        });

        let wasChange = false;
        for (const requestKey in body) {
            const [leftPart] = requestKey.split('_');

            if (allNetworks.includes(leftPart)) {
                wasChange = true;

                const oldProfile = socialProfiles.find(profile => profile.social_network_name === leftPart);

                const profileName = body[`${leftPart}_profile`] || (oldProfile && oldProfile.social_network_profile);
                const profileFollowers = body[`${leftPart}_followers`] || (oldProfile && oldProfile.social_network_followers);

                if (!profileName || !profileFollowers) {
                    throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_SOCIAL_PROFILE.customCode,
                        // eslint-disable-next-line max-len
                        `${leftPart} profile is new for this influencer, so you must send both ${leftPart}_profile and ${leftPart}_followers`);
                }

                const newProfile = {
                    social_network_name: leftPart,
                    social_network_profile: profileName,
                    social_network_followers: profileFollowers
                };
                const profileIndex = socialProfiles.indexOf(oldProfile);

                if (profileIndex === -1) {
                    socialProfiles.push(newProfile);
                } else {
                    socialProfiles[profileIndex] = newProfile;
                }

                delete body[`${leftPart}_profile`];
                delete body[`${leftPart}_followers`];
            }
        }

        if (wasChange) {
            req.body.social_profiles = socialProfiles;
        }

        next();
    } catch (e) {
        next(e);
    }
};
