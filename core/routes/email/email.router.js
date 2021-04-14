const router = require('express').Router();

const { emailController } = require('../../../../OktenWeb/RoliqueInternApp/core/controllers');
const { emailMiddleware } = require('../../../../OktenWeb/RoliqueInternApp/core/middlewares');

router.post('/forgotPassword', emailMiddleware.checkIsUserEmail, emailController.sendForgotToken);

module.exports = router;
