const { magicString: { EMAIL_ACTIONS } } = require('../constants');

module.exports = {
    [EMAIL_ACTIONS.ACTIVATE]: {
        templateName: 'activateAccount',
        subject: 'Activate your account'
    },
    [EMAIL_ACTIONS.FORGOT_PASSWORD]: {
        templateName: 'forgotPassword',
        subject: 'Forgot password'
    }
};
