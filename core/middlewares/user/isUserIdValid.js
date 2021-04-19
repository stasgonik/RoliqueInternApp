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

        next();
    } catch (e) {
        next(e);
    }
};
