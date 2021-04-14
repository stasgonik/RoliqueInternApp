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
                name: body.first_name,
                email: body.email
            });

            await userService.createUser({ ...body, password: hashPassword });

            res.json(successMessages.CREATE);
        } catch (e) {
            next(e);
        }
    },
};
