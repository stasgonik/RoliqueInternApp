const { campaignService, fileService } = require('../services');

module.exports = {
    createCampaign: async (req, res, next) => {
        try {
            const { body } = req;
            if (req.avatar) {
                const { url } = await fileService.uploadFile(req.avatar, 'campaign_logo');
                body.campaign_logo = url;
            }

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
