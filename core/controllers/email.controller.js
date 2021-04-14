const { magicString: { EMAIL_ACTIONS } } = require('../constants');
const { emailService, userService } = require('../services');
const { successMessages } = require('../error');
const { forgotToken } = require('../helper');

module.exports = {
    sendForgotToken: async (req, res, next) => {
        try {
            const { user } = req;

            const token = forgotToken();

            await emailService.sendMail(user.email, EMAIL_ACTIONS.FORGOT_PASSWORD, {
                name: user.first_name,
                token,
            });

            await userService.updateUserById(user._id, { forgot_token: token });

            res.json(successMessages.CHECK_EMAIL);
        } catch (e) {
            next(e);
        }
    }
};
