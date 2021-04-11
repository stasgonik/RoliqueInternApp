const { ErrorHandler, errorCodes, errorMessages } = require('../../error');

module.exports = (whoHaveAccess = []) => (req, res, next) => {
    try {
        const { role } = req.user;

        if (!whoHaveAccess.length) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, 'Access Denied!');
        }

        if (!whoHaveAccess.includes(role)) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, 'Access Denied!');
        }

        next();
    } catch (e) {
        next(e);
    }
};
