const { magicString: { SOCIAL_NETWORKS, PROFILE_DELETE } } = require('../../constants');
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

        // eslint-disable-next-line max-len
        // need to add additional condition to determine an empty field, because checkValue may be meaningful data (such as '' or 0)
        const isFieldEmpty = (field, checkValue) => !field && field !== checkValue;

        let wasChange = false;
        for (const requestKey in body) {
            const [leftPart] = requestKey.split('_');

            if (allNetworks.includes(leftPart)) {
                wasChange = true;

                const oldProfile = socialProfiles.find(profile => profile.social_network_name === leftPart);

                const bodyProfile = body[`${leftPart}_profile`];
                const bodyFollowers = body[`${leftPart}_followers`];

                const profileName = isFieldEmpty(bodyProfile, PROFILE_DELETE.NAME)
                    ? (oldProfile && oldProfile.social_network_profile)
                    : bodyProfile;

                const profileFollowers = isFieldEmpty(bodyFollowers, PROFILE_DELETE.FOLLOWERS)
                    ? (oldProfile && oldProfile.social_network_followers)
                    : bodyFollowers;

                if (isFieldEmpty(profileName, PROFILE_DELETE.NAME) || isFieldEmpty(profileFollowers, PROFILE_DELETE.FOLLOWERS)) {
                    throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_SOCIAL_PROFILE.customCode,
                        // eslint-disable-next-line max-len
                        `${leftPart} profile is new for this influencer, so you must send both ${leftPart}_profile and ${leftPart}_followers`);
                }

                if (leftPart === SOCIAL_NETWORKS.INSTAGRAM) {
                    req.instagramChanged = true;
                }

                const newProfile = {
                    social_network_name: leftPart,
                    social_network_profile: profileName,
                    social_network_followers: profileFollowers
                };
                const profileIndex = socialProfiles.indexOf(oldProfile);

                if (profileName === PROFILE_DELETE.NAME && +profileFollowers === PROFILE_DELETE.FOLLOWERS) {
                    if (profileIndex === -1) { // when user tries to create a new profile with delete-values
                        throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_SOCIAL_PROFILE.customCode,
                            `You cannot create ${leftPart} profile with empty name or zero followers`);
                    }
                    socialProfiles.splice(profileIndex, 1);
                } else if (profileIndex === -1) {
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
