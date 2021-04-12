const router = require('express').Router();
const { userController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');

// TODO: check roles
router.get('/', userController.getUsers);
router.post('/', userMiddleware.isUserValid, userMiddleware.doesUserExist, userController.createUser);

module.exports = router;
