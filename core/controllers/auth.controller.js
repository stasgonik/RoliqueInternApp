const { successMessages } = require('../error');
const { authService } = require('../services');
const { tokenizer, passwordHasher } = require('../helper');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, password } = req;

            await passwordHasher.compare(password, user.password);

            await authService.deleteTokenByParams({ user_id: user._id });

            const token = tokenizer(user.role);

            await authService.createToken(token, user._id);

            res.json({ ...token, user_id: user._id, user_role: user.role });
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

            res.json({ ...tokens, user_id: _id, user_role: role });
        } catch (e) {
            next(e);
        }
    }
};
