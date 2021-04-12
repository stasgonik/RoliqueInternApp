const bcrypt = require('bcrypt');

const { config: { PASSWORD_SALT_VALUE } } = require('../config');
const { ErrorHandler, errorCodes, errorMessages: { WRONG_EMAIL_OF_PASSWORD } } = require('../error');

module.exports = {
    hash: (password) => bcrypt.hash(password, PASSWORD_SALT_VALUE),
    compare: async (password, hashPassword) => {
        const isPasswordEquals = await bcrypt.compare(password, hashPassword);
        if (!isPasswordEquals) {
            throw new ErrorHandler(errorCodes.BAD_REQUEST, WRONG_EMAIL_OF_PASSWORD.customCode, 'Wrong email of password!');
        }
    }
};
