const { queryBuilder: { userQueryBuilder } } = require('../../helper');

module.exports = (req, res, next) => {
    const { sortBy = 'first_name', order = 'asc', ...queryParams } = req.query;

    const filterParams = userQueryBuilder(queryParams);
    req.query = filterParams;

    const orderBy = order === 'asc' ? -1 : 1;
    const sort = { [sortBy]: orderBy };
    req.responseInfo = { sort };

    next();
};
