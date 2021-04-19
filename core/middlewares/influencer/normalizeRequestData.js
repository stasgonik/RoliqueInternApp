const { normalizeText, capitalizeFirstLetter } = require('normalize-text');

module.exports = (req, res, next) => {
    const {
        first_name,
        last_name,
        social_profiles
    } = req.body;

    if (first_name && last_name) {
        let namesArr = [first_name, last_name];

        namesArr = namesArr.map(name => {
            name = normalizeText(name);
            return capitalizeFirstLetter(name);
        });

        [req.body.first_name, req.body.last_name] = namesArr;
    }

    if (social_profiles) {
        social_profiles.forEach(value => {
            value.social_network_name = value.social_network_name.toLowerCase();
        });
    }

    next();
};
