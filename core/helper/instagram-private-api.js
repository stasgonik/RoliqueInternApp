const { IgApiClient } = require('instagram-private-api');

const {
    config: {
        INSTAGRAM,
        INSTAGRAM_PASS
    }
} = require('../config');

// eslint-disable-next-line func-names
module.exports = (function() {
    let ig;

    const login = async () => {
        const newIgInstance = new IgApiClient();
        newIgInstance.state.generateDevice(INSTAGRAM);
        await newIgInstance.account.login(INSTAGRAM, INSTAGRAM_PASS);

        return newIgInstance;
    };

    return {
        getInstance: async () => {
            if (ig) {
                return ig;
            }

            ig = await login();
            return ig;
        }
    };
}());
