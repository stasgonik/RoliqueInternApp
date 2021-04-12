const { ErrorHandler, errorCodes, errorMessages } = require('../../error');

module.exports = (whoHasAccess = []) => (req, res, next) => {
    try {
        const { role } = req.user;

        if (!whoHasAccess.length) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, 'Access Denied!');
        }

        if (!whoHasAccess.includes(role)) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, errorMessages.BAD_REQUEST.customCode, 'Access Denied!');
        }

        next();
    } catch (e) {
        next(e);
    }
};
