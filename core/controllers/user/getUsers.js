const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();

        res.json(users);
    } catch (e) {
        next(e);
    }
};
