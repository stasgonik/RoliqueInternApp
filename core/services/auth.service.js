// eslint-disable-next-line import/no-unresolved
const { OAuth } = require('../database/models');

module.exports = {
    getTokenByParams: (params, model) => OAuth.findOne(params).populate(model),
    createToken: (tokens, id) => OAuth.create({ ...tokens, user_id: id }),
    deleteTokenByParams: (params) => OAuth.deleteOne(params),
};
