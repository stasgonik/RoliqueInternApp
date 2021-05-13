const router = require('express')
    .Router();

const { campaignController } = require('../../controllers');

router.get('/', campaignController.getAllCampaign);
router.post('/', campaignController.createCampaign);

module.exports = router;
