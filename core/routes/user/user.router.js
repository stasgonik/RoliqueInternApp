const router = require('express').Router();
const { userController } = require('../../controllers');
const { userMiddleware, fileMiddleware, authMiddleware } = require('../../middlewares');

router.get('/',
    authMiddleware.checkAccessToken,
    userMiddleware.buildQueryParams,
    userController.getUsers);

router.get('/:userId',
    authMiddleware.checkAccessToken,
    userMiddleware.isUserIdValid,
    userController.getUserById);

router.post('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkRole([
        'admin',
        'manager'
    ]),
    userMiddleware.normalizeNames,
    userMiddleware.isUserValid,
    userMiddleware.checkRoleRights,
    userMiddleware.doesUserExist(),
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userController.createUser);

router.put('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkRole([
        'admin',
        'manager'
    ]),
    userMiddleware.normalizeNames,
    userMiddleware.isUserValid,
    userMiddleware.checkRoleRights,
    userMiddleware.doesUserExist(false),
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userController.editUser);

router.patch('/forgotPassword', userMiddleware.checkIsForgotPassword, userController.forgotPassword);

module.exports = router;
