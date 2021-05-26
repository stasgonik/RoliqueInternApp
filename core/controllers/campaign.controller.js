const { campaignService } = require('../services');

module.exports = {
    createCampaign: async (req, res, next) => {
        // TODO: first create brand, then add its id to req.body to create campaign
        try {
            const { body } = req;

            const campaign = await campaignService.createCampaign(body);

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
