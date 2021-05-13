const { campaignService } = require('../services');

module.exports = {
    createCampaign: (req, res, next) => {
        try {
            const { body } = req;

            const campaign = campaignService.createCampaign(body);

            res.json(campaign)
                .status(200);
        } catch (e) {
            next(e);
        }
    },
    getAllCampaign: async (req, res, next) => {
        try {
            const campaigns = await campaignService.findAll();

            res.json(campaigns);
        } catch (e) {
            next(e);
        }
    }
};
