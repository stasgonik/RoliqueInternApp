const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { influencerValidator } = require('../../validators');

module.exports = (req, res, next) => {
    try {
        const { error } = influencerValidator.createInfluencer.validate(req.body);
        if (error) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, error.details[0].message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
