const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { userValidator } = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        console.log(req.body);

        const { error } = await userValidator.createUserValid.validate(req.body);

        console.log(error);
        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, error.details[0].message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
