const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const isValid = await userService.isIdValid(userId);

        if (!isValid) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, 'User id is invalid');
        }

        const user = await userService.doesUserExist({ _id: userId });

        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.USER_NOT_FOUND.customCode,
                errorMessages.USER_NOT_FOUND.message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
