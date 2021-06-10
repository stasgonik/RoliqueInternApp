module.exports = {
    PORT: process.env.PORT || 5050,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost/rolique',
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:4200;http://localhost:3000',

    PASSWORD_SALT_VALUE: 10,
    CRON_JOB_PERIOD: process.env.CRON_JOB_PERIOD || '0 1 * * *',

    EMAIL_ROOT: process.env.EMAIL_ROOT || 'rootEmail',
    EMAIL_ROOT_PASSWORD: process.env.EMAIL_ROOT_PASSWORD || 'rootPassword',
    EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',

    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME || 'cloudinaryName',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || 'cloudinaryApiKey',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'cloudinarySecret',
    CLOUDINARY_URL: process.env.CLOUDINARY_URL || 'url',

    INSTAGRAM: process.env.INSTAGRAM,
    INSTAGRAM_PASS: process.env.INSTAGRAM_PASS,

    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
};
