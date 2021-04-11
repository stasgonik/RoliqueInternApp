module.exports = class ErrorHandler extends Error {
    constructor(status, customCode, message = '') {
        super(message);
        this.status = status;
        this.customCode = customCode;
        this.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
};
