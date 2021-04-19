const { userService } = require('../../services');
const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');

module.exports = (errorWhenUserExists = true) => async (req, res, next) => {
    try {
        const { email } = req.body;

        const userExists = await userService.checkIfUserExistsByEmail(email);

        if (errorWhenUserExists && userExists) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.USER_ALREADY_EXISTS.customCode,
                errorMessages.USER_ALREADY_EXISTS.message);
        } else if (!errorWhenUserExists && !userExists) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.USER_DOES_NOT_EXIST.customCode,
                errorMessages.USER_DOES_NOT_EXIST.message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
