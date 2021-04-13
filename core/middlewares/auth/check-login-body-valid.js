const { ErrorHandler, errorCodes, errorMessages: { USER_NOT_FOUND, BODY_NOT_VALID } } = require('../../error');
const { authValidator } = require('../../validators');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const { error } = authValidator.loginValid.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, BODY_NOT_VALID.customCode, BODY_NOT_VALID.message);
        }

        const user = await userService.getSingleUser({ email });

        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, USER_NOT_FOUND.customCode, USER_NOT_FOUND.message);
        }

        req.user = user;
        req.password = password;
        next();
    } catch (e) {
        next(e);
    }
};
