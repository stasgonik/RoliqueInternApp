const { rolesMatcher } = require('../../helper');
const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { ROLES } = require('../../constants/magic-string.enum');

module.exports = (req, res, next) => {
    try {
        const {
            user: { role: clientRole },
            body: { role: roleToCreate = ROLES.EMPLOYEE },
        } = req;

        const isClientAllowedToCreate = rolesMatcher(clientRole, roleToCreate);
        if (!isClientAllowedToCreate) {
            throw new ErrorHandler(errorCodes.FORBIDDEN,
                errorMessages.CREATE_FORBIDDEN.customCode, errorMessages.CREATE_FORBIDDEN.message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
