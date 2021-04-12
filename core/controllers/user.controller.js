const { userService } = require('../services');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    createUser: (req, res, next) => {
        try {
            res.send('OK');
        } catch (e) {
            next(e);
        }
    },
};
