module.exports = {
    PORT: process.env.PORT || 5050,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/rolique',
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200;http://localhost:3000',
    PASSWORD_SALT_VALUE: 10
};
