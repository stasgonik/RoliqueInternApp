const jwt = require('jsonwebtoken');

const { jwtSecret: { JWT_SECRET_FORGOT_TOKEN } } = require('../../config');
const {
    ErrorHandler,
    errorCodes,
    errorMessages: { BODY_NOT_VALID, USER_NOT_FOUND, WRONG_TOKEN }
} = require('../../error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { forgot_token, password } = req.body;
        const { error } = userValidator.forgotPasswordValid.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, BODY_NOT_VALID.customCode, BODY_NOT_VALID.message);
        }

        const user = await userService.getSingleUser({ forgot_token }).select('+forgot_token');

        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, USER_NOT_FOUND.customCode, USER_NOT_FOUND.message);
        }

        jwt.verify(forgot_token, JWT_SECRET_FORGOT_TOKEN, (e) => {
            if (e) {
                throw new ErrorHandler(errorCodes.BAD_REQUEST, WRONG_TOKEN.customCode, WRONG_TOKEN.message);
            }
        });

        req.password = password;
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
