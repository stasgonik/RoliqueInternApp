const {
    userService,
    emailService
} = require('../services');
const { passwordHasher } = require('../helper');
const { successMessages } = require('../error');
const { magicString: { EMAIL_ACTIONS } } = require('../constants');

module.exports = {
    getUsers: async (req, res, next) => {
        const {
            query,
            responseInfo
        } = req;

        try {
            const users = await userService.getAllUsers(query, responseInfo);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const { body } = req;

            const hashPassword = await passwordHasher.hash(body.password);

            emailService.sendMail(body.email, EMAIL_ACTIONS.ACTIVATE, {
                name: body.first_name,
                email: body.email
            })
                .catch((reason) => console.log(reason));

            await userService.createUser({
                ...body,
                password: hashPassword
            });

            res.json(successMessages.CREATE);
        } catch (e) {
            next(e);
        }
    },
    editUser: async (req, res, next) => {
        const { body } = req;

        try {
            const userToUpdate = await userService.getUserByEmail(body.email);

            const hashPassword = await passwordHasher.hash(body.password);

            await userService.updateUserById(userToUpdate._id, {
                ...body,
                password: hashPassword
            });

            res.json(successMessages.UPDATE);
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { user, password } = req;

            console.log(user);

            const passwordHash = await passwordHasher.hash(password);

            await userService.updateUserById(user.id, {
                password: passwordHash,
                forgot_token: null
            });

            res.json(successMessages.UPDATE);
        } catch (e) {
            next(e);
        }
    }
};
