const router = require('express').Router();
const { userController } = require('../../controllers');
const { userMiddleware, fileMiddleware } = require('../../middlewares');

// TODO: check roles & tokens
router.get('/', userController.getUsers);
router.post('/',
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatar,
    userMiddleware.isUserValid,
    userMiddleware.doesUserExist,
    userController.createUser);

module.exports = router;
