module.exports = {
    checkRole: require('./check-is-role-valid'),
    checkIsForgotPassword: require('./check-is-forgot-password-valid'),
    isUserValid: require('./isUserValid'),
    checkIsUpdateUser: require('./check-is-update-user.valid'),
    doesUserExist: require('./doesUserExist'),
    checkRoleRights: require('./checkRoleRights'),
    buildQueryParams: require('./buildQueryParams'),
    isUserIdValid: require('./isUserIdValid'),
    normalizeNames: require('./normalizeNames')
};
