const dayjs = require('dayjs');

const { authService } = require('../services');

module.exports = async () => {
    await authService.deleteTokenByParams({
        updatedAt: {
            $lte: dayjs(new Date())
                .subtract(10, 'day')
                .format()
        }
    });
};
