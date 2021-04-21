const { rolesMatcher } = require('../../helper');
const {
    ErrorHandler,
    errorCodes,
    errorMessages
} = require('../../error');
const { magicString: { ROLES } } = require('../../constants');

module.exports = (req, res, next) => {
    try {
        const {
            user: { role: clientRole },
            body: { role: roleToCreate = ROLES.EMPLOYEE },
        } = req;

        const isClientAllowed = rolesMatcher(clientRole, roleToCreate);

        if (!isClientAllowed) {
            throw new ErrorHandler(errorCodes.FORBIDDEN,
                errorMessages.UNAUTHORIZED_ROLE.customCode, errorMessages.UNAUTHORIZED_ROLE.message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
