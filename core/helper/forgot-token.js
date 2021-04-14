const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

module.exports = () => jwt.sign({}, jwtSecret.JWT_SECRET_FORGOT_TOKEN, { expiresIn: '20m' });
