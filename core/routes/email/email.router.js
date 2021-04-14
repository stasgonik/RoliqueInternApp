const router = require('express').Router();

const { emailController } = require('../../controllers');
const { emailMiddleware } = require('../../middlewares');

router.post('/forgotPassword', emailMiddleware.checkIsUserEmail, emailController.sendForgotToken);

module.exports = router;
