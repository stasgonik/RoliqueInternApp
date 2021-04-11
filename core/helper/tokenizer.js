const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config');

module.exports = (role) => {
    const access_token = jwt.sign({ role }, jwtSecret.JWT_SECRET, { expiresIn: '5m' });
    const refresh_token = jwt.sign({ role }, jwtSecret.JWT_SECRET, { expiresIn: '10h' });
    return {
        access_token,
        refresh_token
    };
};
