const { userValidator } = require('../../validators');
const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');

module.exports = (req, res, next) => {
    try {
        const { error } = userValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, error.details[0].message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
