const jwt = require('jsonwebtoken');

const { jwtSecret: { JWT_SECRET } } = require('../../config');
const { magicString: { AUTHORIZATION } } = require('../../constants');
const {
    errorMessages: {
        NO_TOKEN,
        WRONG_TOKEN
    },
    errorCodes,
    ErrorHandler
} = require('../../error');
const { authService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(errorCodes.UNAUTHORIZED, NO_TOKEN.customCode, 'You must send a token to access this page');
        }

        const isExistToken = await authService.getTokenByParams({ access_token: token }, 'user_id');

        if (!isExistToken) {
            throw new ErrorHandler(errorCodes.UNAUTHORIZED, WRONG_TOKEN.customCode, 'Token not valid!');
        }

        const user = isExistToken.user_id;

        jwt.verify(token, JWT_SECRET[user.role], (error) => {
            if (error) {
                throw new ErrorHandler(errorCodes.UNAUTHORIZED, WRONG_TOKEN.customCode, 'Token not valid!');
            }
        });

        req.user = user;
        req.access_token = token;
        next();
    } catch (e) {
        next(e);
    }
};
