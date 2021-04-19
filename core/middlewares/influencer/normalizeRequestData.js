const {
    normalizeText,
    capitalizeFirstLetter
} = require('normalize-text');

module.exports = (req, res, next) => {
    try {
        const {
            first_name,
            last_name,
            social_profiles
        } = req.body;
        if (!first_name || !last_name) {
            return next();
        }

        let namesArr = [first_name, last_name];

        namesArr = namesArr.map(name => {
            name = normalizeText(name);
            return capitalizeFirstLetter(name);
        });

        [req.body.first_name, req.body.last_name] = namesArr;

        social_profiles.forEach(value => {
            value.social_network_name = value.social_network_name.toLowerCase();
        });

        next();
    } catch (e) {
        next(e);
    }
};
