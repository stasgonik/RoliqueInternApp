const { normalizeText, capitalizeFirstLetter } = require('normalize-text');

module.exports = (req, res, next) => {
    const { first_name, last_name } = req.body;
    if (!first_name || !last_name) {
        return next();
    }

    let namesArr = [first_name, last_name];

    namesArr = normalizeText([first_name, last_name]).split(' ');
    namesArr = namesArr.map(name => capitalizeFirstLetter(name));

    req.body = {
        ...req.body,
        first_name: namesArr[0],
        last_name: namesArr[1],
    };

    next();
};
