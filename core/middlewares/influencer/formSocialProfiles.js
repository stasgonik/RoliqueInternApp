const { magicString: { SOCIAL_NETWORKS } } = require('../../constants');
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
                const profileName = body[`${leftPart}_profile`];
                const profileFollowers = body[`${leftPart}_followers`];

                if (!profileName || !profileFollowers) {
                    throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_SOCIAL_PROFILE.customCode,
                        `You must send both ${leftPart}_profile and ${leftPart}_followers`);
                }

                social_profiles.push({
                    social_network_name: leftPart,
                    social_network_profile: profileName,
                    social_network_followers: profileFollowers
                });

                delete body[`${leftPart}_profile`];
                delete body[`${leftPart}_followers`];
            }
        }

        req.body.social_profiles = social_profiles;

        next();
    } catch (e) {
        next(e);
    }
};
