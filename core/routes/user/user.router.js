const router = require('express').Router();
const { userController } = require('../../controllers');
const { userMiddleware, fileMiddleware, authMiddleware } = require('../../middlewares');

router.get('/', userController.getUsers);
router.post('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkRole(['admin', 'manager']),
    userMiddleware.checkRoleRights,
    userMiddleware.isUserValid,
    userMiddleware.doesUserExist(),
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userController.createUser);

router.put('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkRole(['admin', 'manager']),
    userMiddleware.checkRoleRights,
    userMiddleware.isUserValid,
    userMiddleware.doesUserExist(false),
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userController.editUser);

module.exports = router;
