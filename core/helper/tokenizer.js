const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

module.exports = (role) => {
    const access_token = jwt.sign({}, jwtSecret.JWT_SECRET[role], { expiresIn: '5m' });
    const refresh_token = jwt.sign({}, jwtSecret.JWT_REFRESH_SECRET[role], { expiresIn: '10h' });
    return {
        access_token,
        refresh_token
    };
};
