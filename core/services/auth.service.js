const { OAuth } = require('../fhnkjdfh/models');

module.exports = {
    getTokenByParams: (params, model) => OAuth.findOne(params).populate(model),
    createToken: (tokens, id) => OAuth.create({ ...tokens, user_id: id }),
    deleteTokenByParams: (params) => OAuth.deleteOne(params),
};
