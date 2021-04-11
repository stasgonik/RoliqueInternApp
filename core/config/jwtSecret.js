module.exports = {
    JWT_SECRET: {
        user: process.env.JWT_SECRET_USER,
        admin: process.env.JWT_SECRET_ADMIN,

    },
    JWT_REFRESH_SECRET: {
        user: process.env.JWT_REFRESH_SECRET_USER,
        admin: process.env.JWT_REFRESH_SECRET_ADMIN
    },
    JWT_ACTIVATE_SECRET: {
        user: process.env.JWT_ACTIVATE_SECRET_USER,
        admin: process.env.JWT_ACTIVATE_SECRET_ADMIN
    },
};
