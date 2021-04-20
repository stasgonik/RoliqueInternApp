const { SOCIAL_NETWORKS } = require('../../constants/magic-string.enum');
const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');

module.exports = (req, res, next) => {
    const { body } = req;
    const allNetworks = Object.values(SOCIAL_NETWORKS);

    const social_profiles = [];

    try {
        for (const requestKey in body) {
            const [leftPart] = requestKey.split('_');

            if (allNetworks.includes(leftPart)) {
                const profileName = body[`${leftPart}_url`];
                const profileFollowers = body[`${leftPart}_number`];

                if (!profileName || !profileFollowers) {
                    throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_SOCIAL_PROFILE.customCode,
                        `You must send both ${leftPart}_url and ${leftPart}_number`);
                }

                social_profiles.push({
                    social_network_name: leftPart,
                    social_network_profile: profileName,
                    social_network_followers: profileFollowers
                });

                delete body[`${leftPart}_url`];
                delete body[`${leftPart}_number`];
            }
        }

        req.body.social_profiles = social_profiles;

        next();
    } catch (e) {
        next(e);
    }
};
