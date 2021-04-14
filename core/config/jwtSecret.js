const { ROLES } = require('../constants/magic-string.enum');

module.exports = {
    JWT_SECRET: {
        [ROLES.ADMIN]: process.env.JWT_SECRET_ADMIN,
        [ROLES.MANAGER]: process.env.JWT_SECRET_MANAGER,
        [ROLES.EMPLOYEE]: process.env.JWT_SECRET_EMPLOYEE,
    },
    JWT_REFRESH_SECRET: {
        [ROLES.ADMIN]: process.env.JWT_REFRESH_SECRET_ADMIN,
        [ROLES.MANAGER]: process.env.JWT_REFRESH_MANAGER,
        [ROLES.EMPLOYEE]: process.env.JWT_REFRESH_EMPLOYEE,
    },
    JWT_ACTIVATE_SECRET: {
        [ROLES.ADMIN]: process.env.JWT_ACTIVATE_SECRET_ADMIN,
        [ROLES.MANAGER]: process.env.JWT_ACTIVATE_MANAGER,
        [ROLES.EMPLOYEE]: process.env.JWT_ACTIVATE_EMPLOYEE,
    },
};
