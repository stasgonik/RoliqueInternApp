// const jwt = require('jsonwebtoken');

// userService
const { magicString: { AUTHORIZATION } } = require('../../constants');
const { errorMessages: { NO_TOKEN }, errorCodes, ErrorHandler } = require('../../error');

module.exports = (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(errorCodes.FORBIDDEN, NO_TOKEN.customCode, 'Token not valid!');
        }

        //        const isExistToken = await authService.getTokenByParams({ refresh_token: token }, 'user_id');

        // TODO find User

        //        jwt.verify(token, JWT_SECRET[user.role], (error) => {
        //            if (error) {
        //                throw new ErrorHandler(errorCodes.UNAUTHORIZED, WRONG_TOKEN.customCode, 'Token not valid!');
        //            }
        //        });
        //        req.user = user;
        req.access_token = token;
        next();
    } catch (e) {
        next(e);
    }
};
