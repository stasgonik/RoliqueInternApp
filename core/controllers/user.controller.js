const {
    userService,
    emailService,
    fileUploadService
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

            const newUser = await userService.createUser({
                ...body,
                password: hashPassword
            });

            if (avatar) {
                const avatarUploadPath = await fileUploadService.uploadFile(
                    avatar,
                    'user',
                    newUser._id,
                    'photo'
                );
                const avatarPath = avatarUploadPath.split('\\')
                    .join('/');
                await userService.updateUserById(newUser._id, { profile_picture: avatarPath });
            }

            res.json(successMessages.CREATE);
        } catch (e) {
            next(e);
        }
    },
    editUser: async (req, res, next) => {
        try {
            const {
                body,
                params: { userId },
                avatar,
                user
            } = req;

            console.log(user);
            if (body.password) {
                req.body.password = await passwordHasher.hash(body.password);
            }
            if (avatar) {
                if (user.profile_picture) {
                    await fileUploadService.deleteFile(user.profile_picture);
                }
                const avatarUploadPath = await fileUploadService.uploadFile(
                    avatar,
                    'user',
                    userId,
                    'photo'
                );
                const avatarPath = avatarUploadPath.split('\\')
                    .join('/');
                await userService.updateUserById(userId, { profile_picture: avatarPath });
            }
            await userService.updateUserById(userId, {
                ...body,
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
