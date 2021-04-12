const router = require('express').Router();
const { userController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');

router.get('/', userController.getUsers);
router.post('/', userMiddleware.isUserValid, userController.createUser);

module.exports = router;
