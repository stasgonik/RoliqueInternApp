const { magicString: { EMAIL_ACTIONS } } = require('../constants');

module.exports = {
    [EMAIL_ACTIONS.ACTIVATE]: {
        templateName: 'activate',
        subject: 'Activate your account'
    },
    [EMAIL_ACTIONS.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Forgot password'
    }
};
