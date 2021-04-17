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
    BODY_NOT_VALID: {
        customCode: 4003,
        message: 'Body not valid!'
    },
    ID_NOT_VALID: {
        customCode: 4004,
        message: 'Id not valid!'
    },
    FILE_TOO_BIG: {
        customCode: 4005,
        message: 'File is too big'
    },
    TOO_MANY_FILES: {
        customCode: 4006,
        message: 'You have sent more files that it was expected'
    },
    USER_DOES_NOT_EXIST: {
        customCode: 4007,
        message: 'User that you are trying to update does not exist',
    },
    // UNAUTHORIZED
    WRONG_TOKEN: {
        customCode: 4011
    },
    NO_TOKEN: {
        customCode: 4014
    },
    UNAUTHORIZED_ROLE: {
        customCode: 4031,
        message: 'You have no permission to create or update user with such role'
    },
    // NOT FOUND
    USER_NOT_FOUND: {
        customCode: 4042,
        message: 'User not found!',
    },
    INFLUENCER_NOT_FOUND: {
        customCode: 4043,
        message: 'Influencer not found!',
    },

};
