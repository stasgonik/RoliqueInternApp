const router = require('express').Router();
const { userController } = require('../../controllers');
const { userMiddleware, fileMiddleware, authMiddleware } = require('../../middlewares');

router.get('/', userController.getUsers);
router.post('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkRole(['admin', 'manager']),
    userMiddleware.isUserValid,
    userMiddleware.checkCreatePermissions,
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userMiddleware.doesUserExist,
    userController.createUser);

module.exports = router;
