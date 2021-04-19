const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { userValidator } = require('../../validators');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { role } = req.body;
        if (role) {
            req.body.role = role.toLowerCase();
        }

        const { error } = await userValidator.updateUserValid.validate(req.body);
        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, error.details[0].message);
        }

        const user = await userService.getUserById(req.params.userId);

        if (!user) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST,
                errorMessages.USER_NOT_FOUND.customCode,
                errorMessages.USER_NOT_FOUND.message);
        }

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
};
