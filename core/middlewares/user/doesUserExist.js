const { userService } = require('../../services');
const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');

module.exports = async (req, res, next) => {
    const { email } = req.body;

    try {
        const userExists = await userService.checkIfUserExistsByEmail(email);

        if (userExists) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.USER_ALREADY_EXISTS.customCode,
                errorMessages.USER_ALREADY_EXISTS.message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
