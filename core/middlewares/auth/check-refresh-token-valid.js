const jwt = require('jsonwebtoken');

const { magicString: { AUTHORIZATION } } = require('../../constants');
const { jwtSecret: { JWT_REFRESH_SECRET } } = require('../../config');
const { errorMessages: { NO_TOKEN, WRONG_TOKEN }, errorCodes, ErrorHandler } = require('../../error');
const { authService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        let { token } = req.body;

        if (!token) {
            token = req.get(AUTHORIZATION);
            if (!token) {
                throw new ErrorHandler(errorCodes.FORBIDDEN, NO_TOKEN.customCode, 'Token not valid!');
            }
        }

        const isExistToken = await authService.getTokenByParams({ refresh_token: token }, 'user_id');

        if (!isExistToken) {
            throw new ErrorHandler(errorCodes.FORBIDDEN, WRONG_TOKEN.customCode, 'Token not valid!');
        }

        const user = isExistToken.user_id;

        jwt.verify(token, JWT_REFRESH_SECRET[user.role], (error) => {
            if (error) {
                throw new ErrorHandler(errorCodes.UNAUTHORIZED, WRONG_TOKEN.customCode, 'Token not valid!');
            }
        });

        req.user = user;
        req.refresh_token = token;
        next();
    } catch (e) {
        next(e);
    }
};
