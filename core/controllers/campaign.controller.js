const {
    campaignService,
    fileService
} = require('../services');

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
            const { query } = req;

            const campaigns = await campaignService.findAll(query);

            res.json(campaigns);
        } catch (e) {
            next(e);
        }
    },
    updateCampaign: async (req, res, next) => {
        try {
            const {
                body,
                campaign,
                id
            } = req;

            if (req.avatar) {
                if (campaign.campaign_logo) {
                    await fileService.removeFile(campaign.campaign_logo);
                }
                const { url } = await fileService.uploadFile(req.avatar, 'campaign_logo');
                body.campaign_logo = url;
            }

            await campaignService.getSingleCampaign(id, body);

            res.json('updated');
        } catch (e) {
            next(e);
        }
    }
};
