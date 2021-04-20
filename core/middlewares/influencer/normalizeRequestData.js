const {
    normalizeText,
    capitalizeFirstLetter
} = require('normalize-text');

const zeroTimeStr = '00:00:00 GMT';

module.exports = (req, res, next) => {
    try {
        const {
            first_name,
            last_name,
        } = req.body;

        if (first_name && last_name) {
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
        }

        let { birthdate } = req.body;
        if (birthdate) {
            birthdate = birthdate.concat(' ', zeroTimeStr);

            req.body.birthdate = birthdate;
        }

        next();
    } catch (e) {
        next(e);
    }
};
