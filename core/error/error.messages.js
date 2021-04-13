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
    FILE_TOO_BIG: {
        customCode: 4005,
        message: 'File is too big'
    },
    TOO_MANY_FILES: {
        customCode: 4006,
        message: 'You have sent more files that it was expected'
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
