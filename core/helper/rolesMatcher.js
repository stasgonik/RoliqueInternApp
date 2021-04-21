const { ROLES } = require('../constants/magic-string.enum');

const createRights = {
    [ROLES.ADMIN]: Object.values(ROLES), // admin is allowed to create any role
    [ROLES.MANAGER]: [
        ROLES.MANAGER,
        ROLES.EMPLOYEE
    ],
    [ROLES.EMPLOYEE]: [
        ROLES.EMPLOYEE
    ]
};
// checks if client with clientRole is allowed to create/update user with userRole
module.exports = (clientRole, userRole) => createRights[clientRole].includes(userRole);
