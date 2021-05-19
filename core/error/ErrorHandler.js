module.exports = class ErrorHandler extends Error {
    constructor(status, customCode, message = '', payload) {
        super(message);
        this.status = status;
        this.customCode = customCode;
        this.message = message;
        this.payload = payload;

        Error.captureStackTrace(this, this.constructor);
    }
};
