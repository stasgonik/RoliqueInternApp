const { ROLES } = require('../constants/magic-string.enum');

const createRights = {
    [ROLES.ADMIN]: Object.values(ROLES), // admin is allowed to create any role
    [ROLES.MANAGER]: [ROLES.MANAGER, ROLES.EMPLOYEE]
};
// checks if creator with creatorRole is allowed to create user with roleToCreate
module.exports = (creatorRole, roleToCreate) => createRights[creatorRole].includes(roleToCreate);
