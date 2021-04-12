const bcrypt = require('bcrypt');
const { config: { PASSWORD_SALT_VALUE } } = require('../config');

module.exports = {
    hash: (password) => bcrypt.hash(password, PASSWORD_SALT_VALUE),
    compare: (password, hash) => bcrypt.compare(password, hash)
};
