const { userService, emailService } = require('../services');
const { passwordHasher } = require('../helper');
const { successMessages } = require('../error');
const { magicString: { EMAIL_ACTIONS } } = require('../constants');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const { body } = req;

            const hashPassword = await passwordHasher.hash(body.password);

            await emailService.sendMail(body.email, EMAIL_ACTIONS.ACTIVATE, {
                name: req.first_name,
                email: req.email
            });

            await userService.createUser({ ...body, password: hashPassword });

            res.json(successMessages.CREATE);
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { user, password } = req;

            const passwordHash = await passwordHasher.hash(password);

            console.log(passwordHash);
            console.log(user);
            await userService.updateUserById(user.id, { password: passwordHash, forgot_token: null });

            res.json(successMessages.UPDATE);
        } catch (e) {
            next(e);
        }
    }
};
