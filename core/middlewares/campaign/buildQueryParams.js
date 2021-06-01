const { queryBuilder: { campaignQueryBuilder } } = require('../../helper');

module.exports = (req, res, next) => {
    try {
        const queryParams = req.query;

        const filterParams = campaignQueryBuilder(queryParams);
        req.query = filterParams;

        next();
    } catch (e) {
        next(e);
    }
};
