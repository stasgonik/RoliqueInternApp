const { successMessages } = require('../error');
const { authService } = require('../services');
const { tokenizer } = require('../helper');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user } = req;

            // TODO password compare ,password from body
            await authService.deleteTokenByParams({ user_id: user._id });

            const token = tokenizer(user.role);

            await authService.createToken(token, user._id);

            res.json({ ...token, user_id: user._id });
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const { access_token } = req;

            await authService.deleteTokenByParams({ access_token });

            res.json(successMessages.LOGOUT);
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const { user: { role, _id }, refresh_token } = req;

            await authService.deleteTokenByParams({ refresh_token });

            const tokens = tokenizer(role);

            await authService.createToken(tokens, _id);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
