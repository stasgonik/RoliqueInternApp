const {
    normalizeText,
    capitalizeFirstLetter
} = require('normalize-text');

module.exports = (req, res, next) => {
    try {
        const {
            first_name,
            last_name
        } = req.body;
        if (!first_name || !last_name) {
            return next();
        }

        let namesArr = [
            first_name,
            last_name
        ];

        namesArr = namesArr.map(name => {
            name = normalizeText(name);
            return capitalizeFirstLetter(name);
        });

        [
            req.body.first_name,
            req.body.last_name
        ] = namesArr;

        next();
    } catch (e) {
        next(e);
    }
};
