const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { userValidator } = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const { role } = req.body;
        if (role) {
            req.body.role = role.toLowerCase();
        }

        const { error } = await userValidator.createUserValid.validate(req.body);
        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, error.details[0].message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
