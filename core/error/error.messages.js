module.exports = {
//    BAD REQUEST
    BAD_REQUEST: {
        customCode: 4000,
    },
    WRONG_EMAIL_OF_PASSWORD: {
        customCode: 4001
    },
    USER_ALREADY_EXISTS: {
        customCode: 4002,
        message: 'User with such email already exists'
    },
    NO_TOKEN: {
        customCode: 4004
    },
    // UNAUTHORIZED
    WRONG_TOKEN: {
        customCode: 4011
    },
    // NOT FOUND
    USER_NOT_FOUND: {
        customCode: 4042
    },

};
