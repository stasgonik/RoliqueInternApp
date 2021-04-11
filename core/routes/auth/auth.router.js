const router = require('express').Router();

const { authController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

// todo check activate account
router.post('/', authController.login);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);
router.get('/logout', authMiddleware.checkAccessToken, authController.logout);

module.exports = router;
