const { influencerService } = require('../services');
const { successMessages } = require('../error');

module.exports = {
    createInfluencer: async (req, res, next) => {
        try {
            await influencerService.createInfluencer(req.body);

            res.send(successMessages.CREATE);
        } catch (e) {
            next(e);
        }
    }
};
