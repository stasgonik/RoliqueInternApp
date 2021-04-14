const { ErrorHandler, errorMessages: { EMAIL_NOT_VALID, USER_NOT_FOUND }, errorCodes } = require('../../error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const { error } = userValidator.userEmailValid.validate(email);

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, EMAIL_NOT_VALID.customCode, EMAIL_NOT_VALID.message);
        }

        const user = await userService.getSingleUser({ email });

        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, USER_NOT_FOUND.customCode, USER_NOT_FOUND.message);
        }

        console.log(user);
        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
