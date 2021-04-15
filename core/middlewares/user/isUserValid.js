const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { userValidator } = require('../../validators');

module.exports = async (req, res, next) => {
    const { role } = req.body;
    req.body.role = role.toLowerCase();

    try {
        const { error } = await userValidator.createUserValid.validate(req.body);
        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, error.details[0].message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
