const { influencerService } = require('../services');
const { successMessages } = require('../error');

module.exports = {
    getAllInfluencers: async (req, res, next) => {
        try {
            const influencers = await influencerService.getAllInfluencers(req.query);

            res.json(influencers);
        } catch (e) {
            next(e);
        }
    },
    createInfluencer: async (req, res, next) => {
        try {
            await influencerService.createInfluencer(req.body);

            res.send(successMessages.CREATE);
        } catch (e) {
            next(e);
        }
    }
};
