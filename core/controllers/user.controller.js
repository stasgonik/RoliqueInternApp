const {
    userService,
    emailService,
    fileService
} = require('../services');
const { passwordHasher } = require('../helper');
const { successMessages } = require('../error');
const { magicString: { EMAIL_ACTIONS } } = require('../constants');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const {
                query,
                responseInfo
            } = req;

            const users = await userService.getAllUsers(query, responseInfo);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await userService.getUserById(userId);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const {
                body,
                avatar
            } = req;

            const hashPassword = await passwordHasher.hash(body.password);

            emailService.sendMail(body.email, EMAIL_ACTIONS.ACTIVATE, {
                name: body.first_name,
                email: body.email
            })
                .catch((reason) => console.log(reason));

            if (avatar) {
                const cloudResponse = await fileService.uploadFile(avatar);
                req.body = {
                    ...req.body,
                    profile_picture: cloudResponse.url
                };
            }

            await userService.createUser({
                ...req.body,
                password: hashPassword
            });

            res.json(successMessages.CREATE);
        } catch (e) {
            next(e);
        }
    },
    editUser: async (req, res, next) => {
        try {
            const {
                params: { userId },
                avatar,
                user
            } = req;

            if (req.body.password) {
                req.body.password = await passwordHasher.hash(req.body.password);
            }
            if (avatar) {
                if (user.profile_picture) {
                    await fileService.removeFile(user.profile_picture);
                }
                const cloudResponse = await fileService.uploadFile(avatar);
                req.body = {
                    ...req.body,
                    profile_picture: cloudResponse.url
                };
            }
            await userService.updateUserById(userId, {
                ...req.body,
            });

            res.json(successMessages.UPDATE);
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const {
                user,
                password
            } = req;

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
