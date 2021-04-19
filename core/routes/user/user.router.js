const router = require('express')
    .Router();
const { userController } = require('../../controllers');
const {
    userMiddleware,
    fileMiddleware,
    authMiddleware
} = require('../../middlewares');
const { ROLES } = require('../../constants/magic-string.enum');

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
        ROLES.ADMIN,
        ROLES.MANAGER
    ]),
    userMiddleware.normalizeNames,
    userMiddleware.isUserValid,
    userMiddleware.checkRoleRights,
    userMiddleware.doesUserExist(),
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userController.createUser);

router.put('/:userId',
    authMiddleware.checkAccessToken,
    userMiddleware.isUserIdValid,
    userMiddleware.checkRole([
        ROLES.ADMIN,
        ROLES.MANAGER,
        ROLES.EMPLOYEE
    ]),
    userMiddleware.normalizeNames,
    userMiddleware.checkIsUpdateUser,
    userMiddleware.checkRoleRights,
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userController.editUser);

router.patch('/forgotPassword', userMiddleware.checkIsForgotPassword, userController.forgotPassword);

module.exports = router;
